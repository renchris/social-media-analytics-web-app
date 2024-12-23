import tickerVisits from 'src/app/actions'

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request) {
  return Response.json({ tickerVisits })
}
