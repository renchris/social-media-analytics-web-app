### Build a Modern Front-End App for Charting Meta & TikTok Metrics

**Overview:**  
You will build a front-end application that queries metrics data from the provided Meta and TikTok endpoints and visualizes the results in a chart. The APIs require a bearer token (`NEWFORMCODINGCHALLENGE`) [[TEMPORARILY DISABLED NO TOKEN REQUIRED]] and will return metrics based on provided parameters such as date ranges, metrics, dimensions (TikTok) or breakdowns (Meta), and level. You are encouraged to use modern frameworks (Next.js or Remix), styling tools (Tailwind CSS), a UI component library (shadcn/ui), and a charting library. You are also encouraged to use AI-assisted coding tools like **Cursor**, Copilot, or others to help streamline development and exploration.

### Endpoints & Integration

**Base URL:** `https://bizdev.newform.ai`

**Endpoints:**

1. **TikTok:**
   - **POST** `/sample-data/tiktok`
   - **Body Parameters:**
     - `metrics`: An array of metrics (e.g. `["spend", "impressions", "clicks"]`).
     - `dimensions`: An array of dimensions (e.g. `["ad_id", "country_code", "age"]`).
     - `level`: One of `["AUCTION_ADVERTISER", "AUCTION_AD", "AUCTION_CAMPAIGN"]`.
     - `dateRangeEnum` (optional): One of `["LAST_7_DAYS", "LAST_14_DAYS", "LAST_30_DAYS", "LIFETIME"]`.
     - `dateRange` (optional): An object with `{ from: Date, to: Date }` if no preset is used.
     - `reportType` (optional): `["BASIC", "AUDIENCE"]`.

   See the provided code snippet for a full list of allowed metrics/dimensions.

2. **Meta:**
   - **POST** `/sample-data/meta`
   - **Body Parameters:**
     - `metrics`: An array of metrics (e.g. `["spend", "impressions", "clicks"]`).
     - `level`: One of `["account", "campaign", "adset", "ad"]`.
     - `breakdowns`: An array of breakdowns (e.g. `["age", "country", "impression_device"]`).
     - `timeIncrement` (optional): One of `["1", "7", "28", "monthly", "quarterly", "yearly", "all_days"]`.
     - `dateRangeEnum` (optional): One of `["LAST_7_DAYS", "LAST_14_DAYS", "LAST_30_DAYS", "LIFETIME"]`.
     - `dateRange` (optional): If not using preset, provide `{ from: Date, to: Date }`.

**Token:**  
Include the token `NEWFORMCODINGCHALLENGE` in the request headers. The exact header name will be provided (e.g., `Authorization: Bearer NEWFORMCODINGCHALLENGE`).

### Detailed params

Below are the lists of valid parameters based on the provided code snippet.

---

### TikTok Endpoint

**URL:** `POST /sample-data/tiktok`

**Parameters:**

- **metrics (array):**  
  - `"spend"`
  - `"impressions"`
  - `"clicks"`
  - `"conversions"`
  - `"cost_per_conversion"`
  - `"conversion_rate"`
  - `"ctr"`
  - `"cpc"`
  - `"reach"`
  - `"frequency"`
  - `"skan_app_install"`
  - `"skan_cost_per_app_install"`
  - `"skan_purchase"`
  - `"skan_cost_per_purchase"`

- **dimensions (array):**  
  - `"ad_id"`
  - `"campaign_id"`
  - `"adgroup_id"`
  - `"advertiser_id"`
  - `"stat_time_day"`
  - `"campaign_name"`
  - `"adgroup_name"`
  - `"ad_name"`
  - `"country_code"`
  - `"age"`
  - `"gender"`
  - `"province_id"`
  - `"dma_id"`

- **level (string):**  
  - `"AUCTION_ADVERTISER"`
  - `"AUCTION_AD"`
  - `"AUCTION_CAMPAIGN"`

- **dateRangeEnum (optional, string):**  
  - `"last7"`
  - `"last14"`
  - `"last30"`
  - `"lifetime"`

- **dateRange (optional, object):**  
  ```json
  {
    "from": "YYYY-MM-DD",
    "to": "YYYY-MM-DD"
  }
  ```
  Used when `dateRangeEnum` is `undefined`.

- **reportType (optional, string):**  
  - `"BASIC"`
  - `"AUDIENCE"`



---

### Meta Endpoint

**URL:** `POST /sample-data/meta`

**Parameters:**

- **metrics (array):**  
  - `"spend"`
  - `"impressions"`
  - `"clicks"`
  - `"ctr"`
  - `"cpc"`
  - `"reach"`
  - `"frequency"`
  - `"conversions"`
  - `"cost_per_conversion"`
  - `"conversion_rate"`
  - `"actions"`
  - `"cost_per_action_type"`

- **level (string):**  
  - `"account"`
  - `"campaign"`
  - `"adset"`
  - `"ad"`

- **breakdowns (array):**  
  - `"age"`
  - `"gender"`
  - `"country"`
  - `"region"`
  - `"dma"`
  - `"impression_device"`
  - `"platform_position"`
  - `"publisher_platform"`

- **timeIncrement (optional, string):**  
  - `"1"`
  - `"7"`
  - `"28"`
  - `"monthly"`
  - `"quarterly"`
  - `"yearly"`
  - `"all_days"`

- **dateRangeEnum (optional, string):**  
  - `"last7"`
  - `"last14"`
  - `"last30"`
  - `"lifetime"`

- **dateRange (optional, object):**  
  ```json
  {
    "from": "YYYY-MM-DD",
    "to": "YYYY-MM-DD"
  }
  ```
  Used when `dateRangeEnum` is `undefined`.

** Example Request **

```
curl --location 'https://bizdev.newform.ai/sample-data/meta' \
--header 'Content-Type: application/json' \
--data '{
  "metrics": [
    "spend",
    "impressions",
    "clicks",
    "ctr",
    "conversions",
    "cost_per_conversion"
  ],
  "level": "campaign",
  "breakdowns": [
    "age"
  ],
  "timeIncrement": "7",
  "dateRangeEnum": "last30"
}'
```

---

Use these lists as references when constructing requests to the `/sample-data/tiktok` and `/sample-data/meta` endpoints.

### Requirements

1. **Framework & Tools:**
   - **Next.js (v13+) or Remix:** Leverage server-side rendering and data fetching capabilities.
   - **Tailwind CSS:** For rapid, responsive UI styling.
   - **shadcn/ui:** For consistent, accessible UI components like buttons, inputs, and dropdowns.
   - **Charting Library:** Use a modern React charting library (e.g., `recharts`, `react-chartjs-2`, `visx`) to visualize the fetched data.
   - **TypeScript (Preferred):** For type safety and improved developer experience.
   - **AI-Assisted Coding Tools:** Feel free to use Cursor, GitHub Copilot, or similar tools to speed up development and experiment with code generation.

2. **UI Features & Workflow:**
   - **Platform Selection:** A toggle, dropdown, or tabs to switch between querying `meta` and `tiktok` endpoints.
   - **Metrics & Dimensions/Breakdowns Selectors:**  
     - For TikTok: metrics and dimensions (multi-select).  
     - For Meta: metrics and breakdowns (multi-select).
   - **Level Selector:** A single-select for the allowed levels per endpoint (TikTok uses `AUCTION_...` types, Meta uses `account`, `campaign`, etc.).
   - **Date Range Input:**  
     - Support selecting `dateRangeEnum` or a custom date range (`dateRange` with `from` and `to`).
     - Use a date picker for custom ranges.
   - **Time Increment (Meta only):** If desired, choose the `timeIncrement` (optional).
   - **Fetch Data Button:** Trigger an API call with the selected parameters.
   - **Loading & Error States:**  
     - Show a spinner while data is loading.
     - Display an error alert if the request fails or parameters are invalid.
   - **Chart Visualization:**  
     - Once data is fetched, render it in a chart.  
     - Consider a line or bar chart:
       - For time series data (if breakdown/time-based), a line chart could show changes over time.
       - For categorical dimensions, a bar chart could compare metric values across different categories.
     - At minimum, show one metric’s values plotted against one or more dimensions/breakdowns.

3. **Validation & Error Handling:**
   - If no date range or date range enum is selected, show a validation error.
   - If required parameters are missing (e.g., no metrics), disable the "Fetch Data" button or show a validation error.
   - On failed network requests, show a user-friendly error message (not just console errors).

4. **Code Structure:**
   - Keep data fetching logic separate from presentation components (e.g., use Next.js server components or Remix loaders).
   - Make components small and focused.  
   - Document any complex logic with inline comments or brief docstrings.

5. **Deployment & Configuration:**
   - Use environment variables for the token (e.g., `.env.local`).
   - Include instructions in the README for how to configure and run the application locally (`npm install && npm run dev` or `yarn dev`).

6. **Submission:**
   - Provide a GitHub repository link.
   - Include a README with:
     - Setup instructions
     - How to run the project locally
     - Any environment variable configuration required
   - Mention if and how you used AI tools like Cursor or Copilot in your approach.

### Scoring Criteria

- **Correctness:** Ability to fetch data from both endpoints with chosen parameters and render a meaningful chart.
- **Modern Stack Usage:** Effective use of Next.js/Remix, Tailwind, shadcn/ui, and a charting library.
- **User Experience (UX):** Intuitive parameter selection, clear loading/error states, and a well-designed chart.
- **Code Quality:** Clean, modular code that’s easy to understand and maintain.
- **Expandability:** The architecture makes it easy to add more metrics, breakdowns/dimensions, or even different chart types.
- **Use of AI Tools:** Not required, but feel free to mention how AI-assisted coding helped or improved your workflow.
