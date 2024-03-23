import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); // this is a promise , so we need to wait for it using 'await'
    const { username, email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already Exists" },
        { status: 400 }
      );
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User Registered Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
