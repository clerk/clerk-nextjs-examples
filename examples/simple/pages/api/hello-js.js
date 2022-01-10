import {withAuth} from "@clerk/nextjs/api";

export default withAuth((req, res) => {
  res.statusCode = 200;

  if (req.session) {
    res.write(`signed in as user: ${req.session.userId}`);
  } else {
    res.json("not signed in");
  }
});
