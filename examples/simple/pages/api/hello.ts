import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, WithAuthProp } from "@clerk/nextjs/api";

export default withAuth(
  (req: WithAuthProp<NextApiRequest>, res: NextApiResponse<string>) => {
    res.statusCode = 200;
    if (req.auth) {
      res.write(`signed in as user: ${req.auth.userId}`);
    } else {
      res.json("not signed in");
    }
  }
);
