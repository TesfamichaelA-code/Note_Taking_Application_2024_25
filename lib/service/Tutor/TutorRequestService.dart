import 'package:cloud_firestore/cloud_firestore.dart';

class TutorRequestService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<void> createTutoringRequest({
    required String tutorId,
    required String tutorName,
    required String studentName,
    required String studentEmail,
    String? message,
  }) async {
    try {
      // Validate inputs
      if (tutorId.isEmpty ||
          tutorName.isEmpty ||
          studentName.isEmpty ||
          studentEmail.isEmpty) {
        throw Exception('All required fields must be provided');
      }

      // Create the request document
      await _firestore.collection('tutoring_requests').add({
        'tutorId': tutorId,
        'tutorName': tutorName,
        'studentName': studentName,
        'studentEmail': studentEmail,
        'message': message ?? 'No message provided',
        'status': 'PENDING',
        'createdAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      print('Error creating tutoring request: $e');
      throw e;
    }
  }

  Stream<QuerySnapshot> getTutorRequests(String tutorId) {
    return _firestore
        .collection('tutoring_requests')
        .where('tutorId', isEqualTo: tutorId)
        .where('status', isEqualTo: 'PENDING')
        .orderBy('createdAt', descending: true)
        .snapshots();
  }

  Future<void> updateRequestStatus(String requestId, String status) async {
    try {
      await _firestore.collection('tutoring_requests').doc(requestId).update({
        'status': status,
        'updatedAt': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      print('Error updating request status: $e');
      throw e;
    }
  }

  Future<void> deleteRequest(String requestId) async {
    try {
      await _firestore.collection('tutoring_requests').doc(requestId).delete();
    } catch (e) {
      print('Error deleting request: $e');
      throw e;
    }
  }
} 