import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); // this is a promise , so we need to wait for it using 'await'
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    console.log(user);

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword)
      return NextResponse.json({ error: "Wrong Credentials" }, { status: 500 });

    const tokenData = {
      id: user._id,
    };

    const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_JWT_TOKEN!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Loggen In success",
      success: true,
    });

    response.cookies.set("token", token, {httpOnly: true});
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
