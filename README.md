# Next.js x shadcn

## Requirements

Please have NVM installed.
```bash
nvm install 18.19
```

Install the required modules using:
```bash
npm install
```

To start the service:
```bash
npm run dev
```

## Some notable features:
- Pagination
- Searching by show name
- Filtering by rating and/or genre
- Fully functioning dashboard
- Desktop and mobile friendly
- 'Drawer' window by ShadCN UI for showing more details (cast, episodes, and crew)

## Remarks
The required TVMaze API is very limited, as it does not support querying by rating nor genre. To overcome this issue, we first fetched the shows of 6 pages (a total of around 1500 shows), and then based on this list, we can do searching, and filtering by genre and rating.


## Screenshots:
Dashboard:
![alt text](<Screenshots/Screenshot 2024-04-07 at 16.46.41.png>)

Pagination:
![alt text](<Screenshots/Screenshot 2024-04-07 at 16.46.50.png>)

Drawer (more details):
![alt text](<Screenshots/Screenshot 2024-04-07 at 16.47.00.png>)

Filter by genre and rating:
![alt text](<Screenshots/Screenshot 2024-04-07 at 16.47.12.png>)

Search by name, rating, and genre:
![alt text](<Screenshots/Screenshot 2024-04-07 at 16.47.48.png>)

Mobile:
![alt text](<Screenshots/Screenshot 2024-04-07 at 16.55.21.png>)
![alt text](<Screenshots/Screenshot 2024-04-07 at 16.55.28.png>)
