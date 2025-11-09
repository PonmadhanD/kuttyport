import { Router } from 'express';
import { collections } from '../firebase';

const router = Router();

// Test endpoint to verify Firebase connection
router.get('/test-firebase', async (req, res) => {
  try {
    // Try to read a document from Firestore
    const testDoc = await collections.users.doc('test').get();
    
    if (!testDoc.exists) {
      // If the document doesn't exist, create it
      await collections.users.doc('test').set({
        message: 'Firebase connection is working!',
        timestamp: new Date().toISOString()
      });
    }

    // Get the document data
    const docData = testDoc.exists ? testDoc.data() : { message: 'Test document created successfully' };
    
    res.status(200).json({
      success: true,
      message: 'Firebase connection successful',
      data: docData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Firebase test error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      success: false,
      message: 'Error connecting to Firebase',
      error: errorMessage
    });
  }
});

export default router;
