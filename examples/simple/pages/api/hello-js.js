import { withSession } from "@clerk/nextjs/api";

export default withSession((req, res) => {
  res.statusCode = 200;

  if (req.session) {
    res.write(`signed in as user: ${req.session.userId}`);
  } else {
    res.json("not signed in");
  }
});
