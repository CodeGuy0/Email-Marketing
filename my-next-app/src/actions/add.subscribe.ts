// "use server";

// import Subscriber from "@/models/subscriber.model";
// import { connectDb } from "@/shared/libs/db";
// import { validateEmail } from "@/shared/utils/ZeroBounceApi";
// // import { clerkClient } from "@clerk/nextjs";
// import { clerkClient } from "@clerk/nextjs/server";


// export const subscribe = async ({
//   email,
//   username,
// }: {
//   email: string;
//   username: string;
// }) => {
//   try {
//     await connectDb();

//     // first we need to fetch all users
//     // const allUsers = await clerkClient.users.getUserList();

//     const allUsers = await clerkClient.users.getUserList();
//     console.log(allUsers);


//     // now we need to find our newsletter owner
//     const newsletterOwner = allUsers.find((i) => i.username === username);

//     if (!newsletterOwner) {
//       throw Error("Username is not vaild!");
//     }

//     // check if subscribers already exists
//     const isSubscriberExist = await Subscriber.findOne({
//       email,
//       newsLetterOwnerId: newsletterOwner?.id,
//     });

//     if (isSubscriberExist) {
//       return { error: "Email already exists!" };
//     }

//     // Validate email
//     const validationResponse = await validateEmail({ email });
//     if (validationResponse.status === "invalid") {
//       return { error: "Email not valid!" };
//     }

//     // Create new subscriber
//     const subscriber = await Subscriber.create({
//       email,
//       newsLetterOwnerId: newsletterOwner?.id,
//       source: "By MelonMail website",
//       status: "Subscribed",
//     });
//     return subscriber;
//   } catch (error) {
//     console.error(error);
//     return { error: "An error occurred while subscribing." };
//   }
// };


"use server";

import Subscriber from "@/models/subscriber.model";
import { connectDb } from "@/shared/libs/db";
import { validateEmail } from "@/shared/utils/ZeroBounceApi";
import { clerkClient } from "@clerk/nextjs/server"; // Ensure this import is correct

interface ClerkUser {
  id: string;
  username?: string; // Optional if it might not be present
  emailAddresses?: Array<{ emailAddress: string; id: string; isPrimary: boolean }>; // If applicable
  // Add any other relevant properties you expect from Clerk
}

export const subscribe = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  try {
    await connectDb();

    // Fetch all users
    const allUsers = await clerkClient.users.getUserList() as unknown as ClerkUser[];

    // Find the newsletter owner by username
    const newsletterOwner = allUsers.find((user) => user.username === username);

    if (!newsletterOwner) {
      throw new Error("Username is not valid!");
    }

    // Check if the subscriber already exists
    const isSubscriberExist = await Subscriber.findOne({
      email,
      newsLetterOwnerId: newsletterOwner.id,
    });

    if (isSubscriberExist) {
      return { error: "Email already exists!" };
    }

    // Validate email
    const validationResponse = await validateEmail({ email });
    if (validationResponse.status === "invalid") {
      return { error: "Email not valid!" };
    }

    // Create a new subscriber
    const subscriber = await Subscriber.create({
      email,
      newsLetterOwnerId: newsletterOwner.id,
      source: "By MelonMail website",
      status: "Subscribed",
    });

    return subscriber;
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while subscribing." };
  }
};



