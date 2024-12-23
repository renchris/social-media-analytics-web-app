import tickerVisits from 'src/app/actions'

type ICompany = [number, string, string, string]

const companyDictionary: Record<string, ICompany> = {};

(async () => {
  const response: Response = await fetch('https://www.sec.gov/files/company_tickers_exchange.json')

  const { data } = await response.json()

  const companies: ICompany[] = data

  // eslint-disable-next-line no-restricted-syntax
  for (const company of companies) {
    if (!companyDictionary[company[2]]) {
      companyDictionary[company[2]] = company
    }
  }
})()

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const selectedCompany = companyDictionary[slug]

  if (!tickerVisits[slug]) {
    tickerVisits[slug] = 1
  } else {
    tickerVisits[slug] += 1
  }

  return Response.json({ selectedCompany })
}
