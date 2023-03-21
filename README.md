# Sentence Pairs Parser

Parser made to convert txt files to json format on [http://www.manythings.org/anki/](http://www.manythings.org/anki/), which takes the sentences in [https://tatoeba.org](https://tatoeba.org) and converts them into sentence pairs.
## Installation

you need [pnpm](https://pnpm.io/installation).

```bash 
  pnpm install
  pnpm start
```

> pnpm start for /tur/tur.txt and /aze/aze.txt

Or your txt file.

```bash
  pnpm build {{YOUR_TXT_FILE_PATH}}
```
#### Example

Clone this repo.
```bash
  git clone https://github.com/ibodev1/sentence-pairs-parser
  cd sentence-pairs-parser
```

Go this link [http://www.manythings.org/anki/](http://www.manythings.org/anki/) choose your language and download the zip file.

Example [rus_eng.zip](http://www.manythings.org/anki/rus-eng.zip) file.

Unzip the ```rus.txt``` (not _about.txt) file and put it in the ```sentence-pairs-parser``` folder.

```bash
  pnpm build ./rus.txt
```

and open rus.json