import { connectDB } from "./mongodb";

let bootstrapped = false;

export async function bootstrap() {
  if (bootstrapped) return;

  await connectDB();

  bootstrapped = true;
}
