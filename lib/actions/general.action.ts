import { db } from "@/firebase/admin";

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  try {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error: any) {
    console.log("Error fetching interviews", error);
    return null;
  }
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  try {
    const { userId, limit = 20 } = params;

    const interviews = await db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .where("finalized", "==", true)
      .where("userId", "!=", userId)
      .limit(limit)
      .get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (error: any) {
    console.log("Error fetching interviews", error);
    return null;
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    const interview = await db.collection("interviews").doc(id).get();

    return interview.data() as Interview | null;
  } catch (error: any) {
    console.log("Error fetching interview", error);
    return null;
  }
}
