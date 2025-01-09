import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:supply_on_campus/widgets/nav_bar.dart';

class TutorRequestsPage extends StatefulWidget {
  const TutorRequestsPage({Key? key}) : super(key: key);

  @override
  _TutorRequestsPageState createState() => _TutorRequestsPageState();
}

class _TutorRequestsPageState extends State<TutorRequestsPage> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<void> _handleAction(String requestId, String action) async {
    try {
      await _firestore.collection('tutoring_requests').doc(requestId).update({
        'status': action,
        'updatedAt': FieldValue.serverTimestamp(),
      });

      if (!mounted) return;
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Request ${action.toLowerCase()}ed successfully'),
          backgroundColor: action == 'ACCEPTED' ? Colors.green : Colors.red,
        ),
      );
    } catch (e) {
      if (!mounted) return;
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  Widget _buildRequestCard(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  backgroundColor: Colors.blue[100],
                  child: Text(
                    data['studentName']?[0] ?? 'S',
                    style: const TextStyle(
                      color: Colors.blue,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        data['studentName'] ?? 'Unknown Student',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        data['studentEmail'] ?? 'No email',
                        style: TextStyle(
                          color: Colors.grey[600],
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            if (data['message'] != null) ...[
              const SizedBox(height: 12),
              Text(
                data['message'],
                style: TextStyle(
                  color: Colors.grey[800],
                ),
              ),
            ],
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () => _handleAction(doc.id, 'REJECTED'),
                  style: TextButton.styleFrom(
                    foregroundColor: Colors.red,
                  ),
                  child: const Text('Deny'),
                ),
                const SizedBox(width: 12),
                ElevatedButton(
                  onPressed: () => _handleAction(doc.id, 'ACCEPTED'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF263AFF),
                    foregroundColor: Colors.white,
                  ),
                  child: const Text('Accept'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const NavBar(),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: StreamBuilder<QuerySnapshot>(
                stream: _firestore
                    .collection('tutoring_requests')
                    .where('status', isEqualTo: 'PENDING')
                    .orderBy('createdAt', descending: true)
                    .snapshots(),
                builder: (context, snapshot) {
                  if (snapshot.hasError) {
                    return Center(
                      child: Text('Error: ${snapshot.error}'),
                    );
                  }

                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  }

                  if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                    return const Center(
                      child: Text('No pending requests'),
                    );
                  }

                  return ListView.builder(
                    itemCount: snapshot.data!.docs.length,
                    itemBuilder: (context, index) {
                      return _buildRequestCard(snapshot.data!.docs[index]);
                    },
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
} 