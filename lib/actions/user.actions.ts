"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../apprite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export async function signIn({ email, password }: signInProps) {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;

  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error("Error creating user");

    // const dwollaCustomerUrl = await createDwollaCustomer({
    //   ...userData,
    //   type: "personal",
    // });

    // if (!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer");

    // const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    // const newUser = await database.createDocument(
    //   DATABASE_ID!,
    //   USER_COLLECTION_ID!,
    //   ID.unique(),
    //   {
    //     ...userData,
    //     userId: newUserAccount.$id,
    //     dwollaCustomerId,
    //     dwollaCustomerUrl,
    //   }
    // );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();
    return result;

    // const user = await getUserInfo({ userId: result.$id });

    // return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    console.log(error);

    return null;
  }
};
