import type { NextApiRequest, NextApiResponse } from 'next'
import { withSession, WithSessionProp } from '@clerk/nextjs/api'

export default withSession((
  req: WithSessionProp<NextApiRequest>,
  res: NextApiResponse<string>
) => {
  res.statusCode = 200;

  if (req.session) {
    res.write(`signed in as user: ${req.session!.userId!.toString()}`);
  } else {
    res.json("not signed in");
  }
})
