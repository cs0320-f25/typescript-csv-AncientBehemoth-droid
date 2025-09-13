# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

In my opinion, our current parser is far from perfect, and we will need a lot of changes to make it a good product. Here are some of my propositions:
 1) A CSV parser needs to not separate commas that are inside of the double quotes, and also if two or more double quotes are in a row, it should treat them as one (Mainly functionality)
 2) A CSV parser needs to be able to handle different kinds of data, converting the results as the user requests (Both functionality and extencibility)
 3) A CSV parser should be able to deal with uneven rows, either throwing an error or maybe filling smaller rows with empty objects.
 4) A CSV parser needs to be able to account presence/absense of the header line, performing separate actions according to it's status.

- #### Step 2: Use an LLM to help expand your perspective.
By using copilot, I learned about some more niche cases like:
1) A parser should be supporting different encodings of the symbols. (Extensibility for users who might not have standart one.)
2) A parser should be good at handling malformed CSV: Have a clear strategy for invalid files (e.g., unclosed quoted field). 
3) A parser should correctly handle newline characters (\n or \r\n) that appear within a quoted field without treating them as a new row.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

In my opition the top 4 enhancements, in the form of user stories are:
I want my parser to pass all kinds of string data correctly - without separating commas inside of quotes, and with combining several consecutive quotes in one. It will allow me to not worry about errors if I formatted data by convention.
I want my parser to be able to transofm the data according to the schemas I provide, so that I can get different kinds of data through parsing.
I want my parser to throw transparent, specific errors for every separate issue that can be with the data, so that I can quickly understand and fix/configure it.
I want my parser to have more options, that allows me to select whether I have a header or not, whether it's okay that some fields are empty etc; so that I can be flexible with how i want it to work.



### Design Choices
There hadn't been too many unique design choices, just a basic parser though Zod. The only unique thing was how I handled the error - if Zod parser gets incorrect data, it will error in a way that will let user know the line in csv data, where the parser errored, thus allowing for better fixes.

### 1340 Supplement

- #### 1. Correctness
    Parser is usually a utility program, meant for processing large data in format that's uneasy to work with, into a format much more comfortable. So in my opinion, for parser, both concrete, transparent functionality, and flexibility are important. Specifically CSV parser should: 
     - Transform the inputted file based on the schema provided by the user. 
     - Transform them correctly (without separating commas in double quotes and with combining consecutive double quotes into one)
     - Detect whether the file has a header, and depending on that perform specific actions
     - If the user gives incomplete/incorrectly formatted data, CSV parser should either throw an error or fill the missing data in a way that user will realize it's incorrect.
     - Should be able to handle any kinds of datatypes that can be in CSV.
     - Should communicate errors to the user in accessible way.


- #### 2. Random, On-Demand Generation

Random generation is actually a very good technique for testing. I agree that in more advanced version of parser, it should be involved. The benefits are that, usually, despite all of the tries and brainstorming, we tend to miss at least some of the edgecases, but if we run through a large set of random CSV data, we might just find the edge case we forgot to consider. Additionally, random generation helps to make sure that our program can work on wide variety of examples, and that our own testing biases do not prevent us from testing certain characteristics.


- #### 3. Overall experience, Bugs encountered and resolved

It was honestly not a very good first experience, but that is almost exclusively my fault. Due to the intensity of my shopping period, I didn't have the time to really dive into the project beyond the surface level. This project was a bit different from projects I did on other lessons, in that it is much more about writing and reflection then it is about coding. However, due to no prior experience in Java, the coding was still pretty difficult for me. The test suites themselves should be pretty throughrough, though not for the Zod schemas part.

#### Team members and contributions (include cs logins): Yevhen Burkovskyi, yburkovs

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): Copilot Ai for task 2, wrote many of the detailed characteristics of potential parser. I also used a lot of internet resources, like Zod documentation and other educational materials on Typescript. I haven't worked with any collaborators in this project.
#### Total estimated time it took to complete project: 6 hours
#### Link to GitHub Repo: git@github.com:cs0320-f25/typescript-csv-AncientBehemoth-droid.git
