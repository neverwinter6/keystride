(() => {
  'use strict';

  /* =========================================================
     Data
     ========================================================= */

  const STORAGE_KEY = 'keystride.progress.v1';
  const CONSENT_KEY = 'keystride.consent.v1';
  const CONSENT_VERSION = 1;
  const MAX_HISTORY = 100;

  const UNITS = [
    {
      number: '01',
      title: 'Groundwork',
      lessons: [
        {
          id: 'anchors',
          title: 'Find your home',
          desc: 'Settle into the two anchor keys that everything else returns to.',
          tip: 'The raised bumps on F and J let you reset without looking down.',
          coach: 'Keep your wrists floating, not resting. Tap F and J with your index fingers and return to the bumps.',
          targetWpm: 18,
          targetAccuracy: 94,
          focus: ['F', 'J'],
          drills: [
            'fff jjj fff jjj fj fj jf jf ffj jjf fjj jff fjf jfj fff jjj fjf jfj',
            'jjj fff jjj fff jf jf fj fj jjf ffj jff fjj jfj fjf jjj fff jf jf',
            'fj jf fj jf fff jjj fjj jff fjf jfj fff jjj jf fj jff fjj fjf jfj'
          ]
        },
        {
          id: 'home-neighbors',
          title: 'Neighbors on the row',
          desc: 'Add A, S, D, K, L and semicolon to your home base.',
          tip: 'One finger moves at a time. The rest of the hand stays settled.',
          coach: 'Only the active finger moves. Keep the other fingers lightly resting on their home keys.',
          targetWpm: 22,
          targetAccuracy: 95,
          focus: ['A', 'S', 'D', 'K', 'L', ';'],
          drills: [
            'asdf jkl; asdf jkl; ask dad; a lad; fall; glass; flask; salad; alas; add;',
            'dad asks; a lass; all lads; a glass flask; salad; ask dad; fall; alas;',
            'a sad lad; all dads ask; a glass salad; fall; flask; add a dash; alas;'
          ]
        },
        {
          id: 'home-words',
          title: 'Home-row words',
          desc: 'Build real words using only the eight home-row letters.',
          tip: 'Say the whole word in your head, then let your fingers finish it.',
          coach: 'Read the word before you type it. Accuracy is the lesson here; speed is a side effect.',
          targetWpm: 25,
          targetAccuracy: 96,
          focus: ['Home row'],
          drills: [
            'a glad dad; a glass flask; ask a lad; all fall; add salad; a sad lass;',
            'dad had a salad; all lads ask; a flask falls; alas; add a dash; glass;',
            'a lass had a salad; dad asks; all glass falls; add a flask; a glad lad;'
          ]
        }
      ]
    },
    {
      number: '02',
      title: 'The reach',
      lessons: [
        {
          id: 'reach-ei',
          title: 'E and I, up close',
          desc: 'Reach up with your middle fingers without losing the anchors.',
          tip: 'Your middle fingers own E and I. They should return to D and K after every reach.',
          coach: 'Reach straight up with the middle finger, then snap back to D or K. No hand drift.',
          targetWpm: 27,
          targetAccuracy: 96,
          focus: ['E', 'I'],
          drills: [
            'did he see a field; she hid a file; a slide; his idea; if he did; he did;',
            'he did; she did; a field; his file; a slide; idea; if he hid a file; she did;',
            'she had a file; he had a slide; did he see; if she did; a field; his idea;'
          ]
        },
        {
          id: 'reach-ruty',
          title: 'R, U, T, Y',
          desc: 'Extend your index fingers to the top row and come right back.',
          tip: 'R and T belong to the left index; Y and U belong to the right.',
          coach: 'Index fingers travel to R and U. Keep the other fingers anchored on the home row.',
          targetWpm: 30,
          targetAccuracy: 96,
          focus: ['R', 'U', 'T', 'Y'],
          drills: [
            'try this; your first try; a trusty study; it is truly useful; they try;',
            'trust your first try; try this; a truly useful study; it is your turn;',
            'your first try; trust the study; try it; they truly try; it is useful;'
          ]
        },
        {
          id: 'top-words',
          title: 'Top-row words',
          desc: 'Bring Q, W, O and P into the mix with relaxed reaches.',
          tip: 'The pinkies take Q and P. Let your ring and middle fingers stay home.',
          coach: 'Q and P are your pinkies’ job. Stretch just far enough, then release.',
          targetWpm: 32,
          targetAccuracy: 96,
          focus: ['Q', 'W', 'O', 'P'],
          drills: [
            'we write quiet words; a proper quote; two people power through; we were there;',
            'our quiet work; write a proper quote; two people power through; we were there;',
            'a quiet power; write your quote; two people work; we were there; proper words;'
          ]
        }
      ]
    },
    {
      number: '03',
      title: 'The whole board',
      lessons: [
        {
          id: 'bottom-row',
          title: 'The bottom row',
          desc: 'Drop down for Z, X, C, V, B, N and M using your index and middle fingers.',
          tip: 'Curl your fingers down rather than moving your whole hand.',
          coach: 'The index fingers own B and N. Keep your wrists still and let the fingers curl.',
          targetWpm: 34,
          targetAccuracy: 96,
          focus: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
          drills: [
            'mix the next move; a calm breeze; zoom in; a brave new view; very nice;',
            'a brave new move; mix the next calm breeze; a very nice view; zoom in;',
            'move the box; mix a calm breeze; brave and clever; the next wave; zoom in;'
          ]
        },
        {
          id: 'shift-punctuation',
          title: 'Shift & friends',
          desc: 'Use opposite-hand shift and keep punctuation clean.',
          tip: 'Press Shift with the pinky opposite the letter, then release it right away.',
          coach: 'Opposite-hand shift is the secret. If the letter is on the right, shift with the left pinky.',
          targetWpm: 34,
          targetAccuracy: 95,
          focus: ['Shift', '?', ',', '.'],
          drills: [
            "Ready, set, go. Don't rush; a good run feels easy. Can you keep calm?",
            "Keep it calm, keep it clean. Don't chase speed; let it come. Ready?",
            "Start slow. Stay light. Don't force it; the speed will follow. Ready?"
          ]
        },
        {
          id: 'alphabet',
          title: 'The whole alphabet',
          desc: 'A pair of pangrams to prove the full board is yours.',
          tip: 'If you lose your place, stop, find F and J, and begin again.',
          coach: 'Eyes on the words, not your hands. If you slip, reset on F and J.',
          targetWpm: 38,
          targetAccuracy: 96,
          focus: ['A–Z'],
          drills: [
            'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.',
            'Waltz, bad nymph, for quick jigs vex. Sphinx of black quartz, judge my vow.',
            'The five boxing wizards jump quickly. Bright vixens jump; dozy fowl quack.'
          ]
        }
      ]
    },
    {
      number: '04',
      title: 'Flow',
      lessons: [
        {
          id: 'common-words',
          title: 'Words that carry you',
          desc: 'Train the high-frequency words that make up most of what you write.',
          tip: 'Read ahead by one word. Your hands should follow your eyes, not your memory.',
          coach: 'Read a couple of words ahead. Keep the motion continuous rather than stop-start.',
          targetWpm: 45,
          targetAccuracy: 97,
          focus: ['High frequency'],
          drills: [
            'When you type the words you use every day, your hands begin to move without asking. The goal is not to go faster; it is to stop thinking about the keys.',
            'The best typists are not rushing. They are reading a little ahead, keeping a steady beat, and letting their fingers find the way.',
            'Most of what we write is made of familiar words. Practice them until they stop being letters and start being shapes under your fingers.'
          ]
        },
        {
          id: 'rhythm',
          title: 'Find your rhythm',
          desc: 'Trade bursts for a steady beat and look a word ahead.',
          tip: 'A metronome pace wins. Rush one word and you lose the next three.',
          coach: 'Aim for an even rhythm, not a fast burst. Smooth is faster than stop-start.',
          targetWpm: 50,
          targetAccuracy: 97,
          focus: ['Rhythm', 'Flow'],
          drills: [
            'Speed is a habit built one clean keystroke at a time. Accuracy is the path that gets you there. Breathe, look ahead, and let the rhythm carry you.',
            'A calm hand is a quick hand. Let the sentence pull you forward, keep your eyes on the words, and trust the map in your fingers.',
            'Do not chase the last word. Stay in the one you are typing, keep the pressure light, and let the next word arrive on its own.'
          ]
        },
        {
          id: 'final-sprint',
          title: 'The final sprint',
          desc: 'Put it all together in a longer, uninterrupted flow.',
          tip: 'Light fingers, steady breath, eyes one step ahead. You have already done the work.',
          coach: 'Let your shoulders drop. Light fingers, steady rhythm, eyes ahead.',
          targetWpm: 55,
          targetAccuracy: 97,
          focus: ['Everything'],
          drills: [
            'A quiet room, a steady breath, and a line of text waiting to be written. You do not need to force speed; it arrives when every key lands where it should. Keep your eyes on the screen, your fingers loose, and your rhythm even. This is the moment where practice becomes instinct.',
            'You have built a map in your hands. The keys no longer need to be found; they are simply there. Stay light, stay curious, and let the next sentence come at its own pace. Speed is what happens when accuracy stops feeling like effort.',
            'The page is not a race. It is a place to put one clean word after another. Breathe, read ahead, and let your hands do the quiet work they have practiced. Accuracy becomes rhythm, and rhythm becomes speed.'
          ]
        }
      ]
    },
    {
      number: '05',
      title: 'Digits & marks',
      lessons: [
        {
          id: 'number-row',
          title: 'The number row',
          desc: 'Stretch from the home row to 1–0 without losing your place.',
          tip: 'The number keys are one long reach. Return to the anchors after every digit.',
          coach: 'Use the nearest finger and keep the reaches small. The number row is a stretch, not a jump.',
          targetWpm: 24,
          targetAccuracy: 96,
          focus: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
          drills: [
            '1 2 3 4 5 6 7 8 9 0 10 20 30 40 50 60 70 80 90',
            'In 2026, 45 people typed 120 words in 3 minutes.',
            'Call 555 0123; order 12 boxes by 9 March 2027.'
          ]
        },
        {
          id: 'symbol-reaches',
          title: 'Hyphens & symbols',
          desc: 'Train the punctuation that lives on the right edge of the board.',
          tip: 'Brackets, slashes and semicolons are small targets. Slow down to hit the exact key.',
          coach: 'Keep the right pinky light. Symbols are precision work, not strength work.',
          targetWpm: 24,
          targetAccuracy: 96,
          focus: ['-', '=', '[', ']', ';', "'", ',', '.', '/'],
          drills: [
            'user-name = first-name + last-name; path/to/file; [draft]',
            'Wait - listen: one, two, three; then go.',
            "a-b=c; x/y=z; [done]; don't stop."
          ]
        },
        {
          id: 'email-urls',
          title: 'Emails & URLs',
          desc: 'Build the address-and-link rhythm you use all day.',
          tip: 'The at sign, slash and colon are shifted symbols. Use the opposite-hand Shift.',
          coach: 'Read the address in chunks: name, at, domain, path. Then type the chunk without looking down.',
          targetWpm: 26,
          targetAccuracy: 96,
          focus: ['@', '.', '/', ':', '_'],
          drills: [
            'hello@keystride.app  https://keystride.app/guide',
            'support@example.com; www.example.org/docs; user_name@site.io',
            'localhost:4173; api.example.com/v1/users; git@github.com:user/repo.git'
          ]
        }
      ]
    },
    {
      number: '06',
      title: 'Real-world text',
      lessons: [
        {
          id: 'capital-names',
          title: 'Names & capitals',
          desc: 'Practice proper nouns, titles and the opposite-hand Shift.',
          tip: 'Capitalize with the pinky opposite the letter, then release Shift immediately.',
          coach: 'Shift is a quick tap, not a hold. The longer you keep it down, the more the hand drifts.',
          targetWpm: 34,
          targetAccuracy: 96,
          focus: ['Shift', 'Names', 'Titles'],
          drills: [
            'Ada Lovelace met Charles Babbage in London.',
            'Maya Angelou, Tokyo, Sunday, and the Pacific Ocean.',
            'Dr. Chen will meet Sam in New York on Friday.'
          ]
        },
        {
          id: 'lists-notes',
          title: 'Lists & notes',
          desc: 'Type numbered lists, dashes and quick personal notes.',
          tip: 'List punctuation repeats. Find a rhythm for the number, the dot and the space.',
          coach: 'Keep the list structure clean. Accuracy on the numbers makes the notes easier to scan later.',
          targetWpm: 33,
          targetAccuracy: 96,
          focus: ['1.', '-', ':', ';'],
          drills: [
            '1. Wake up. 2. Make coffee. 3. Read the brief. 4. Start typing.',
            'To do: email Ada; book the room; revise notes; send the draft.',
            '- milk - bread - coffee - a new notebook - a quiet hour'
          ]
        },
        {
          id: 'dialogue',
          title: 'Quotes & dialogue',
          desc: 'Keep quotation marks, commas and apostrophes in the right places.',
          tip: 'Quotes are a pair. Type the opening and closing marks as one thought.',
          coach: 'Slow down at the edges of a quotation. The punctuation is doing grammatical work.',
          targetWpm: 32,
          targetAccuracy: 96,
          focus: ['"', "'", ',', ';'],
          drills: [
            "She said, \"Keep going; you're almost there.\"",
            "'Wait,' he said. 'Read it once more.'",
            'The note read: "Start slow. Stay light. Finish clean."'
          ]
        }
      ]
    },
    {
      number: '07',
      title: 'Voice & rhythm',
      lessons: [
        {
          id: 'tricky-words',
          title: 'Tricky words',
          desc: 'Build muscle memory for long and easily misspelled words.',
          tip: 'Look at the whole word before you begin. A clean shape is faster than a correction.',
          coach: 'Do not sound out every letter. Read the word as a shape and let the fingers finish it.',
          targetWpm: 42,
          targetAccuracy: 97,
          focus: ['Double letters', 'Common traps'],
          drills: [
            'necessary rhythm occurrence beginning accommodate separate definitely',
            'The committee recommended a necessary revision to the original schedule.',
            'She believes the rhythm is essential; he disagrees, but they keep practicing.'
          ]
        },
        {
          id: 'paragraph-flow',
          title: 'Paragraph flow',
          desc: 'Carry your rhythm across three connected sentences.',
          tip: 'Keep your eyes moving. The end of a sentence is not a place to stop.',
          coach: 'A paragraph has a pulse. Let the comma be a breath and the period be a clean landing.',
          targetWpm: 46,
          targetAccuracy: 97,
          focus: ['Flow', 'Punctuation'],
          drills: [
            'A good paragraph has a pulse. It gives the eye a place to pause, then carries it forward with a clean line of thought. Keep the sentence moving and let the punctuation do the breathing.',
            'When you write, you are not only choosing words. You are setting a pace. Short sentences land. Longer ones gather momentum, turn a corner, and settle again.',
            'The page rewards patience. Read the next few words before your hands arrive, and the sentence will feel less like a row of letters and more like a single motion.'
          ]
        },
        {
          id: 'numbers-dates',
          title: 'Numbers & dates',
          desc: 'Mix digits, dates and punctuation without breaking the flow.',
          tip: 'Numbers are precision practice. Say the whole date in your head before typing it.',
          coach: 'Stay calm around commas and colons. The digits should arrive in one clean group.',
          targetWpm: 38,
          targetAccuracy: 97,
          focus: ['Digits', 'Dates', 'Commas'],
          drills: [
            'On 7 November 2026, 72 lessons were added to the 48 already online.',
            'Invoice 1042 totals 1,280 euros; it is due on 15 December.',
            'The 09:30 train leaves from platform 4 on track 12.'
          ]
        }
      ]
    },
    {
      number: '08',
      title: 'Long form',
      lessons: [
        {
          id: 'speed-bursts',
          title: 'Speed bursts',
          desc: 'Repeat short, clean lines to build a steady internal metronome.',
          tip: 'Repeat the line without losing the spaces. Rhythm matters more than a single fast burst.',
          coach: 'Keep the beat even. You are training consistency, not chasing a new top speed.',
          targetWpm: 50,
          targetAccuracy: 97,
          focus: ['Rhythm', 'Repeats'],
          drills: [
            'Keep the beat. Keep the beat. Keep the beat. Keep the beat.',
            'Type clean. Type calm. Type clean. Type calm. Type clean. Type calm.',
            'One more line. One more line. One more line. One more line.'
          ]
        },
        {
          id: 'long-sentences',
          title: 'Long sentences',
          desc: 'Stay ahead through clauses, commas and ideas that turn a corner.',
          tip: 'Read a phrase ahead, not a whole paragraph. Keep your place with the beat.',
          coach: 'Long sentences reward a calm eye. Do not rush the comma; let the clause finish.',
          targetWpm: 52,
          targetAccuracy: 97,
          focus: ['Clauses', 'Stamina'],
          drills: [
            'The best way to raise your speed is to stop chasing speed and start protecting accuracy, because clean repetitions are the ones that become automatic.',
            'A typist who reads one word ahead, keeps the wrists quiet, and returns to the home row after every reach will move faster than one who simply tries harder.',
            'The keyboard is a small physical map, and fluency is what happens when the map moves out of your head and into your hands.'
          ]
        },
        {
          id: 'graduation-run',
          title: 'The long run',
          desc: 'A final, longer pass through everything you have practiced.',
          tip: 'Settle into the paragraph. Breathe, read ahead, and let the finish arrive on its own.',
          coach: 'This is the endurance pass. Keep the shoulders down and the rhythm unbroken.',
          targetWpm: 58,
          targetAccuracy: 97,
          focus: ['Everything', 'Endurance'],
          drills: [
            'You have practiced the anchors, the reaches, the punctuation, and the quiet return to the home row. Now the work becomes a rhythm: eyes ahead, hands light, breath steady, and every key landing where it should. Do not rush the finish. The finish is just another line.',
            'A quiet room. A steady hand. A sentence that begins as a thought and ends as a clean row of letters. You do not need to force the speed; it arrives when the accuracy has nowhere else to go. Keep the rhythm, keep the breath, and let the page keep moving.',
            'The keyboard has become quieter under your hands. You are not hunting for letters now; you are following a sentence as it unfolds. Stay relaxed, look a few words ahead, and let the last line end the same way the first one began: deliberately, cleanly, and without a hurry.'
          ]
        }
      ]
    }
  ];

  const codeBlock = (...lines) => lines.join('\n');

  const CODE_UNITS = [
    {
      number: '01',
      title: 'Syntax gym',
      lessons: [
        {
          id: 'code-brackets',
          title: 'Brackets & braces',
          desc: 'Build the punctuation reflexes that every language depends on.',
          tip: 'Brackets come in pairs. Type the pair as one thought, then fill the space between.',
          coach: 'Square, round and curly brackets share neighboring keys. Keep your fingers low and return to the anchors.',
          targetWpm: 18,
          targetAccuracy: 96,
          focus: ['(', ')', '[', ']', '{', '}'],
          drills: [
            codeBlock('const bag = [1, 2, 3];', 'const user = { name: "Ada" };'),
            codeBlock('([{}]) [({})]'),
            codeBlock('const values = [10, 20, 30];', 'if (values.length > 0) {', '  console.log(values[0]);', '}')
          ]
        },
        {
          id: 'code-operators',
          title: 'Operators & comparisons',
          desc: 'Train =, +, -, *, / and the comparison symbols that fill real code.',
          tip: 'The equals key is a pinky reach. Do not let the whole hand slide off the home row.',
          coach: 'Symbols are small targets. Slow down enough to hit the exact key, especially with the right pinky.',
          targetWpm: 20,
          targetAccuracy: 96,
          focus: ['=', '+', '-', '*', '/', '>', '<'],
          drills: [
            codeBlock('const total = price * quantity + tax;'),
            codeBlock('if (status === "ready" && count !== 0) return true;'),
            codeBlock('const [min, max] = value <= 10 ? [0, 10] : [10, 100];')
          ]
        },
        {
          id: 'code-strings',
          title: 'Quotes & strings',
          desc: 'Get comfortable with single quotes, double quotes and backticks.',
          tip: 'Double quotes need Shift; the single quote and backtick sit on unshifted keys.',
          coach: 'Use the opposite hand for Shift. Keep the quote finger relaxed and return to the home row.',
          targetWpm: 20,
          targetAccuracy: 96,
          focus: ["'", '"', '`'],
          drills: [
            codeBlock("const name = 'Ada';", 'const message = "Hello, world!";'),
            codeBlock('const label = `User: ${name}`;', 'console.log("Ready?");'),
            codeBlock('const path = `/api/users/${id}`;', 'const status = "ready";')
          ]
        }
      ]
    },
    {
      number: '02',
      title: 'The toolbelt',
      lessons: [
        {
          id: 'code-identifiers',
          title: 'camelCase & snake_case',
          desc: 'Build identifiers with underscores, capitals and mixed-case names.',
          tip: 'Underscores live on the right pinky; capitals need the opposite-hand Shift.',
          coach: 'Read the whole identifier before you type it. Naming conventions become muscle memory quickly.',
          targetWpm: 22,
          targetAccuracy: 96,
          focus: ['_', 'camelCase', 'snake_case'],
          drills: [
            codeBlock('const userName = "Ada";', 'const user_name = "Ada";'),
            codeBlock('function getUserName(userId) {', '  return "user-" + userId;', '}'),
            codeBlock('const API_BASE_URL = "https://api.example.com";', 'const request_id = crypto.randomUUID();')
          ]
        },
        {
          id: 'code-keywords',
          title: 'Keywords & control flow',
          desc: 'Type functions, conditionals and loops without breaking your rhythm.',
          tip: 'Keywords are long, so let accuracy lead. A wrong character costs more time than one slow pass.',
          coach: 'Start each line with your eyes ahead. Let the common keyword shapes become automatic.',
          targetWpm: 23,
          targetAccuracy: 96,
          focus: ['const', 'function', 'return', 'if', 'else', 'for', 'while'],
          drills: [
            codeBlock('function clamp(value, min, max) {', '  if (value < min) return min;', '  if (value > max) return max;', '  return value;', '}'),
            codeBlock('for (let i = 0; i < 3; i += 1) {', '  console.log(i);', '}', '', 'while (ready) {', '  wait();', '}'),
            codeBlock('const active = items.filter((item) => item.ready);', 'if (active.length === 0) {', '  return null;', '}')
          ]
        },
        {
          id: 'code-comments',
          title: 'Comments & documentation',
          desc: 'Practice the comment markers that explain your code to the next human.',
          tip: 'Slash and asterisk sit on the right pinky. The hash lives on the number row.',
          coach: 'Comments slow you down in a useful way. Type them exactly as you would explain the code.',
          targetWpm: 23,
          targetAccuracy: 96,
          focus: ['//', '/*', '*/', '#'],
          drills: [
            codeBlock('// Fetch the current user.', 'const user = await getUser(id);', '', '/* Cache the result', '   for the next request. */', 'cache.set(id, user);'),
            codeBlock('# Normalize the input.', 'name = name.strip().lower()', '', '# Return the cleaned value.', 'return name'),
            codeBlock('/**', ' * Return the total price.', ' * @param {number[]} items', ' */', 'function total(items) {', '  return items.reduce((a, b) => a + b, 0);', '}')
          ]
        }
      ]
    },
    {
      number: '03',
      title: 'Real code',
      lessons: [
        {
          id: 'code-javascript',
          title: 'JavaScript patterns',
          desc: 'Type arrays, objects, callbacks and arrow functions in their natural shape.',
          tip: 'Code is structured text. Let the comma and closing bracket become a single motion.',
          coach: 'Read the line as a shape, not individual letters. Keep the Shift reaches quiet and small.',
          targetWpm: 25,
          targetAccuracy: 97,
          focus: ['[]', '{}', '=>', ';'],
          drills: [
            codeBlock('const items = [12, 8, 30];', 'const total = items.reduce((sum, n) => sum + n, 0);', 'console.log(total);'),
            codeBlock('const users = [', '  { id: 1, name: "Ada" },', '  { id: 2, name: "Linus" },', '];', '', 'const names = users.map((user) => user.name);'),
            codeBlock('const state = { ready: true, count: 0 };', 'state.count += 1;', 'export default state;')
          ]
        },
        {
          id: 'code-async',
          title: 'Async & errors',
          desc: 'Build fluency with await, fetch, promises and error handling.',
          tip: 'Template literals use backticks and ${}. Use the opposite hand for Shift on braces.',
          coach: 'Async code has a clear rhythm: call, check, return. Read one line ahead while your hands catch up.',
          targetWpm: 25,
          targetAccuracy: 97,
          focus: ['async', 'await', '=>', '`${}`'],
          drills: [
            codeBlock('async function loadUser(id) {', '  const response = await fetch(`/api/users/${id}`);', '  if (!response.ok) throw new Error("User not found");', '  return response.json();', '}'),
            codeBlock('try {', '  const data = await loadUser(7);', '  render(data);', '} catch (error) {', '  console.error(error);', '}'),
            codeBlock('const response = await fetch("/api/health");', 'if (!response.ok) {', '  throw new Error(`Request failed: ${response.status}`);', '}')
          ]
        },
        {
          id: 'code-python',
          title: 'Python indentation',
          desc: 'Train clean four-space indentation and Python-specific syntax.',
          tip: 'Python uses spaces, not braces. Press Space four times at each new block.',
          coach: 'Indentation is part of the code. Keep the rhythm even and do not let the spaces drift.',
          targetWpm: 22,
          targetAccuracy: 97,
          focus: ['def', ':', '    ', 'f"{}"'],
          drills: [
            codeBlock('def greet(name):', '    message = f"Hello, {name}!"', '    return message', '', 'print(greet("Ada"))'),
            codeBlock('def total(prices):', '    return sum(price for price in prices)', '', 'if __name__ == "__main__":', '    print(total([12, 8, 30]))'),
            codeBlock('class User:', '    def __init__(self, name):', '        self.name = name', '', '    def greet(self):', '        return f"Hi, {self.name}"')
          ]
        },
        {
          id: 'code-jsx',
          title: 'Markup & JSX',
          desc: 'Practice angle brackets, attributes and component syntax.',
          tip: 'Angle brackets are a Shift reach on comma and period. Keep the wrist steady.',
          coach: 'Markup lines are punctuation-dense. Slow down on every opening and closing tag.',
          targetWpm: 24,
          targetAccuracy: 97,
          focus: ['<', '>', '/', '{}'],
          drills: [
            codeBlock('function Button({ label, onClick }) {', '  return <button onClick={onClick}>{label}</button>;', '}'),
            codeBlock('const App = () => (', '  <main className="app">', '    <h1>Hello, {user.name}</h1>', '    <Button label="Save" onClick={save} />', '  </main>', ');'),
            codeBlock('<section className="card">', '  <h2>{title}</h2>', '  <p>{description}</p>', '</section>')
          ]
        }
      ]
    },
    {
      number: '04',
      title: 'In the wild',
      lessons: [
        {
          id: 'code-terminal',
          title: 'Terminal & Git',
          desc: 'Train the commands, flags and paths you reach for every day.',
          tip: 'Dashes, slashes and quotes are the sound of the command line. Keep the fingers light.',
          coach: 'Commands are short bursts. Accuracy on flags and paths saves you from re-running everything.',
          targetWpm: 26,
          targetAccuracy: 96,
          focus: ['-', '/', '"', '~'],
          drills: [
            codeBlock('git status', 'git add .', 'git commit -m "fix: handle empty state"', 'npm run dev'),
            codeBlock('docker compose up -d', 'curl -s http://localhost:4173/health', 'grep -R "timeout" ./src'),
            codeBlock('cd ~/projects/keystride', 'pnpm install', 'pnpm test', 'git push origin main')
          ]
        },
        {
          id: 'code-sprint',
          title: 'The code sprint',
          desc: 'A longer, punctuation-heavy pass through the patterns you have practiced.',
          tip: 'Do not chase speed on a long snippet. Find a line-level rhythm and keep it there.',
          coach: 'This is the final coding pass. Let accuracy carry the pace and keep your eyes one line ahead.',
          targetWpm: 28,
          targetAccuracy: 97,
          focus: ['Everything'],
          drills: [
            codeBlock('function groupBy(items, key) {', '  return items.reduce((groups, item) => {', '    const value = item[key];', '    (groups[value] ||= []).push(item);', '    return groups;', '  }, {});', '}', '', 'const result = groupBy(users, "role");', 'console.log(result);'),
            codeBlock('export async function handler(req, res) {', '  try {', '    const payload = await req.json();', '    if (!payload.email) {', '      return res.status(400).json({ error: "Email required" });', '    }', '    return res.status(200).json({ ok: true });', '  } catch (err) {', '    return res.status(500).json({ error: err.message });', '  }', '}'),
            codeBlock('const cache = new Map();', '', 'export function memoize(fn) {', '  return (...args) => {', '    const key = JSON.stringify(args);', '    if (!cache.has(key)) cache.set(key, fn(...args));', '    return cache.get(key);', '  };', '}')
          ]
        }
      ]
    },
    {
      number: '05',
      title: 'Data & queries',
      lessons: [
        {
          id: 'code-sql',
          title: 'SQL queries',
          desc: 'Read and type SQL clauses without losing the semicolon.',
          tip: 'Keep each clause on its own line. The semicolon ends the statement, not every line.',
          coach: 'SQL has a repeating shape: action, source, condition, order. Find the shape and the line becomes easier.',
          targetWpm: 24,
          targetAccuracy: 97,
          focus: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
          drills: [
            codeBlock('SELECT id, name, email', 'FROM users', 'WHERE active = true', 'ORDER BY name;'),
            codeBlock('SELECT users.name, orders.total', 'FROM users', 'JOIN orders ON orders.user_id = users.id', 'WHERE orders.total > 50;'),
            codeBlock('UPDATE users', 'SET active = false', 'WHERE last_login < "2026-01-01";')
          ]
        },
        {
          id: 'code-json',
          title: 'JSON payloads',
          desc: 'Practice braces, keys, strings and the commas that hold a payload together.',
          tip: 'JSON hates a trailing comma. Type each pair, then verify the comma before the close.',
          coach: 'Read one key-value pair at a time. Keep the quote pairs quiet and exact.',
          targetWpm: 25,
          targetAccuracy: 97,
          focus: ['{}', '""', ',', ':'],
          drills: [
            codeBlock('{', '  "name": "Keystride",', '  "version": "2.2.0",', '  "private": true', '}'),
            codeBlock('{', '  "id": 7,', '  "ok": true,', '  "items": ["one", "two"]', '}'),
            codeBlock('{', '  "user": { "id": 1, "name": "Ada" },', '  "token": "abc123",', '  "expires": 3600', '}')
          ]
        },
        {
          id: 'code-csv',
          title: 'CSV & rows',
          desc: 'Type table data and the small parsing loops that turn rows into records.',
          tip: 'Commas separate fields; newlines separate rows. Do not let the two rhythms blur.',
          coach: 'Keep rows short and consistent. Accuracy on the delimiters is what makes the data usable.',
          targetWpm: 26,
          targetAccuracy: 96,
          focus: ['Commas', 'Newlines', 'Quotes'],
          drills: [
            codeBlock('name,role,active', 'Ada,Engineer,true', 'Linus,Maintainer,false'),
            codeBlock('const rows = data.trim().split("\\n");', 'const headers = rows.shift().split(",");', 'console.log(headers);'),
            codeBlock('id,email,total', '1,ada@example.com,42', '2,linus@example.com,18')
          ]
        }
      ]
    },
    {
      number: '06',
      title: 'Shell & scripts',
      lessons: [
        {
          id: 'code-shell-pipes',
          title: 'Pipes & flags',
          desc: 'Type the small commands that connect and filter real tools.',
          tip: 'A pipe is a thin vertical reach. Keep the command short and the flags precise.',
          coach: 'Read each command as a sentence: command, option, target. Keep the spaces deliberate.',
          targetWpm: 26,
          targetAccuracy: 97,
          focus: ['|', '-', '/', '"'],
          drills: [
            codeBlock('cat access.log | grep "500" | wc -l', 'find . -name "*.js" -type f', 'ps aux | grep node'),
            codeBlock('grep -R "TODO" ./src | head -20', 'tail -f logs/app.log', 'du -sh node_modules'),
            codeBlock('npm run build && npm test', 'node --check app.js', 'curl -s http://localhost:4173/health')
          ]
        },
        {
          id: 'code-git-branch',
          title: 'Branches & commits',
          desc: 'Practice the Git paths, flags and messages you use on every change.',
          tip: 'Branch names are lowercase paths with slashes and hyphens. Keep the message direct.',
          coach: 'Git commands are short. Accuracy on the branch name matters more than speed.',
          targetWpm: 27,
          targetAccuracy: 97,
          focus: ['git', '-', '/', '"'],
          drills: [
            codeBlock('git switch -c feat/typing-stats', 'git add app.js styles.css', 'git commit -m "feat: add typing stats"', 'git push -u origin feat/typing-stats'),
            codeBlock('git log --oneline --decorate -5', 'git diff --stat', 'git restore --staged app.js'),
            codeBlock('git fetch origin', 'git rebase origin/main', 'git status', 'git push origin main')
          ]
        },
        {
          id: 'code-shell-script',
          title: 'Shell scripts',
          desc: 'Type shebangs, variables and loops with a calm, deliberate rhythm.',
          tip: 'Treat the shebang as one symbol pattern. Then settle into the script blocks.',
          coach: 'Scripts mix words and symbols. Read the line before the cursor and keep the indentation consistent.',
          targetWpm: 28,
          targetAccuracy: 97,
          focus: ['#!', '$', '{}', '"'],
          drills: [
            codeBlock('#!/usr/bin/env bash', 'set -euo pipefail', '', 'for file in ./src/*.js; do', '  echo "Checking $file"', '  node --check "$file"', 'done'),
            codeBlock('#!/usr/bin/env bash', 'set -euo pipefail', '', 'name="Keystride"', 'echo "Starting $name"', 'npm run build'),
            codeBlock('if [ -f .env ]; then', '  echo "Loading environment"', '  set -a; source .env; set +a', 'fi')
          ]
        }
      ]
    },
    {
      number: '07',
      title: 'Patterns & testing',
      lessons: [
        {
          id: 'code-regex',
          title: 'Regular expressions',
          desc: 'Train the dense punctuation used by patterns and search.',
          tip: 'Regex is punctuation with a purpose. Type one token at a time and keep the brackets paired.',
          coach: 'Do not guess your way through a pattern. Read the bracket groups and anchors before you start.',
          targetWpm: 28,
          targetAccuracy: 97,
          focus: ['[]', '^', '$', '/', '+'],
          drills: [
            codeBlock('const pattern = /^[a-z]+$/;', 'const cleaned = value.replace(/[^a-z0-9]+/g, "-");', 'const hasNumber = /[0-9]/.test(input);'),
            codeBlock('const email = /^[^@]+@[^@]+[.][a-z]+$/;', 'const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");', 'if (!email.test(address)) throw new Error("Invalid email");'),
            codeBlock('const words = text.match(/[A-Za-z]+/g) || [];', 'const unique = [...new Set(words)].sort();')
          ]
        },
        {
          id: 'code-tests',
          title: 'Tests & assertions',
          desc: 'Type test names, callbacks and assertions as if you were writing a tiny contract.',
          tip: 'Keep the test name in quotes and the assertion chain tight. Every bracket has a partner.',
          coach: 'Tests are punctuation-heavy. Slow down at the closing brace and trust the structure.',
          targetWpm: 29,
          targetAccuracy: 97,
          focus: ['test()', 'expect()', '=>', '{}'],
          drills: [
            codeBlock('test("adds numbers", () => {', '  expect(add(2, 3)).toBe(5);', '});', '', 'test("rejects empty input", () => {', '  expect(parse("")).toBeNull();', '});'),
            codeBlock('describe("formatName", () => {', '  it("trims whitespace", () => {', '    expect(formatName("  Ada  ")).toBe("Ada");', '  });', '});'),
            codeBlock('const result = groupBy(items, "role");', 'expect(result.admin).toHaveLength(2);', 'expect(result.user).toHaveLength(3);')
          ]
        },
        {
          id: 'code-debugging',
          title: 'Debugging & errors',
          desc: 'Practice template literals, try/catch blocks and meaningful error messages.',
          tip: 'Backticks and interpolation are the tricky part. Type the template as one complete thought.',
          coach: 'Error paths are still code. Keep the message readable and the catch block honest.',
          targetWpm: 29,
          targetAccuracy: 97,
          focus: ['try', 'catch', '`${}`', 'throw'],
          drills: [
            codeBlock('try {', '  const data = JSON.parse(raw);', '  console.log(data);', '} catch (error) {', '  console.error(`Invalid JSON: ${error.message}`);', '}'),
            codeBlock('console.time("load");', 'await loadUsers();', 'console.timeEnd("load");', 'console.log({ count, average });'),
            codeBlock('if (!response.ok) {', '  throw new Error(`HTTP ${response.status}: ${response.statusText}`);', '}')
          ]
        }
      ]
    },
    {
      number: '08',
      title: 'Build something',
      lessons: [
        {
          id: 'code-typescript',
          title: 'TypeScript shapes',
          desc: 'Type interfaces, union types and annotated functions.',
          tip: 'Colons introduce types. Keep the indentation clean and the braces aligned.',
          coach: 'TypeScript is punctuation plus intent. Read the type before you type the value.',
          targetWpm: 30,
          targetAccuracy: 97,
          focus: ['interface', ':', '|', '=>'],
          drills: [
            codeBlock('interface User {', '  id: number;', '  name: string;', '  active: boolean;', '}', '', 'function greet(user: User): string {', '  return `Hello, ${user.name}`;', '}'),
            codeBlock('type Status = "idle" | "loading" | "ready" | "error";', '', 'function render(status: Status) {', '  console.log(`Current status: ${status}`);', '}'),
            codeBlock('const users: User[] = await fetchUsers();', 'const active = users.filter((user) => user.active);')
          ]
        },
        {
          id: 'code-api-route',
          title: 'API routes',
          desc: 'Build request handlers with JSON responses and status codes.',
          tip: 'Route code is full of brackets and objects. Keep one response shape in mind.',
          coach: 'Read the request, check the input, return the response. That rhythm keeps the handler clear.',
          targetWpm: 30,
          targetAccuracy: 97,
          focus: ['async', 'json()', 'status', 'return'],
          drills: [
            codeBlock('export async function POST(request) {', '  const body = await request.json();', '  if (!body.email) {', '    return Response.json({ error: "Email required" }, { status: 400 });', '  }', '  return Response.json({ ok: true }, { status: 201 });', '}'),
            codeBlock('export async function GET(request) {', '  const { searchParams } = new URL(request.url);', '  const limit = Number(searchParams.get("limit") || 10);', '  return Response.json({ limit });', '}'),
            codeBlock('export default async function handler(req, res) {', '  if (req.method !== "POST") return res.status(405).end();', '  const data = await req.json();', '  res.status(200).json({ data });', '}')
          ]
        },
        {
          id: 'code-final-build',
          title: 'The final build',
          desc: 'A longer, realistic pass through components, utilities and data.',
          tip: 'This is a build, not a race. Keep each block clean and let the whole file arrive line by line.',
          coach: 'This is the last coding pass. Breathe, read the structure, and keep the rhythm all the way to the final brace.',
          targetWpm: 32,
          targetAccuracy: 97,
          focus: ['Everything', 'Endurance'],
          drills: [
            codeBlock('import { useState } from "react";', '', 'export function Counter() {', '  const [count, setCount] = useState(0);', '', '  return (', '    <button onClick={() => setCount(count + 1)}>', '      Count: {count}', '    </button>', '  );', '}'),
            codeBlock('export function paginate(items, page, size) {', '  const start = page * size;', '  return {', '    items: items.slice(start, start + size),', '    total: items.length,', '  };', '}'),
            codeBlock('const response = await fetch("/api/users");', 'const users = await response.json();', 'const active = users.filter((user) => user.active);', 'console.log(active.length);')
          ]
        }
      ]
    }
  ];

  const LANGUAGE_UNITS = [
    {
      number: '01',
      title: 'Go & Rust',
      lessons: [
        {
          id: 'lang-go-basics',
          title: 'Go: first program',
          desc: 'Packages, imports, functions and the clean shape of a small Go program.',
          tip: 'Go is deliberate about structure. Type the package, the import and the function as three separate beats.',
          coach: 'Brace placement is part of the syntax. Keep the opening brace on the declaration line.',
          targetWpm: 24,
          targetAccuracy: 96,
          focus: ['package', 'func', 'fmt', ':='],
          drills: [
            codeBlock('package main', '', 'import "fmt"', '', 'func main() {', '    fmt.Println("Hello, Keystride")', '}'),
            codeBlock('func add(a int, b int) int {', '    return a + b', '}'),
            codeBlock('type User struct {', '    Name string', '    Active bool', '}')
          ]
        },
        {
          id: 'lang-go-concurrency',
          title: 'Go: goroutines',
          desc: 'Practice channels, goroutines and the arrows that move values between them.',
          tip: 'The channel arrow is left-pointing: make(chan int) and <-channel. Read the direction before typing.',
          coach: 'Concurrency syntax is compact. Slow down on the channel arrows and keep the braces paired.',
          targetWpm: 25,
          targetAccuracy: 96,
          focus: ['go', 'chan', '<-', 'defer'],
          drills: [
            codeBlock('func worker(id int, jobs <-chan int) {', '    for job := range jobs {', '        fmt.Println(id, job)', '    }', '}'),
            codeBlock('messages := make(chan string)', 'go func() {', '    messages <- "ready"', '}()', 'fmt.Println(<-messages)'),
            codeBlock('var wg sync.WaitGroup', 'wg.Add(1)', 'go func() {', '    defer wg.Done()', '    fmt.Println("working")', '}()', 'wg.Wait()')
          ]
        },
        {
          id: 'lang-rust-ownership',
          title: 'Rust: ownership',
          desc: 'Type mutable bindings, borrows and the ownership shapes Rust is known for.',
          tip: 'Ampersands come before borrows; an exclamation mark means a macro. Keep them close to the name.',
          coach: 'Rust rewards exactness. Let the ampersands and type annotations arrive as one small group.',
          targetWpm: 24,
          targetAccuracy: 96,
          focus: ['let', 'mut', 'String', '&'],
          drills: [
            codeBlock('fn main() {', '    let mut count = 0;', '    count += 1;', '    println!("Count: {}", count);', '}'),
            codeBlock('fn take(name: String) {', '    println!("{}", name);', '}', '', 'fn main() {', '    let name = String::from("Ada");', '    take(name);', '}'),
            codeBlock('let values = vec![1, 2, 3];', 'let doubled: Vec<i32> = values.iter().map(|x| x * 2).collect();')
          ]
        },
        {
          id: 'lang-rust-errors',
          title: 'Rust: results',
          desc: 'Practice Result, match arms and the question-mark error path.',
          tip: 'Generic angle brackets and the result variants are the difficult parts. Type the shape before the body.',
          coach: 'Read the return type, then the early return. Rust errors are explicit, so the syntax should be too.',
          targetWpm: 25,
          targetAccuracy: 96,
          focus: ['Result', 'Ok', 'Err', 'match'],
          drills: [
            codeBlock('fn divide(a: i32, b: i32) -> Result<i32, String> {', '    if b == 0 {', '        return Err(String::from("Cannot divide by zero"));', '    }', '    Ok(a / b)', '}'),
            codeBlock('match divide(10, 2) {', '    Ok(value) => println!("{}", value),', '    Err(message) => eprintln!("{}", message),', '}'),
            codeBlock('let value = divide(8, 0).unwrap_or(0);', 'println!("{}", value);')
          ]
        }
      ]
    },
    {
      number: '02',
      title: 'C & C++',
      lessons: [
        {
          id: 'lang-c-pointers',
          title: 'C: pointers',
          desc: 'Type addresses, dereferences and the small operators that carry C.',
          tip: 'The star can declare a pointer or dereference one. Keep the pointer type readable.',
          coach: 'C is about exact symbols. Pause at each ampersand and star before moving on.',
          targetWpm: 23,
          targetAccuracy: 96,
          focus: ['*', '&', 'int', '->'],
          drills: [
            codeBlock('#include <stdio.h>', '', 'int main(void) {', '    int value = 42;', '    int *pointer = &value;', '    printf("%d", *pointer);', '    return 0;', '}'),
            codeBlock('void swap(int *a, int *b) {', '    int temp = *a;', '    *a = *b;', '    *b = temp;', '}'),
            codeBlock('int values[3] = {10, 20, 30};', 'for (int i = 0; i < 3; i += 1) {', '    printf("%d", values[i]);', '}')
          ]
        },
        {
          id: 'lang-c-structs',
          title: 'C: structs & headers',
          desc: 'Practice typedefs, struct fields and the headers that precede real C files.',
          tip: 'The preprocessor line uses angle brackets and a hash. Type it as one tight phrase.',
          coach: 'Headers come before the body. Keep the include, the typedef and the field list in separate breaths.',
          targetWpm: 23,
          targetAccuracy: 96,
          focus: ['#include', 'struct', 'typedef', '.'],
          drills: [
            codeBlock('#include <stdio.h>', '', 'typedef struct {', '    int id;', '    char name[32];', '} User;'),
            codeBlock('User user = { .id = 1, .name = "Ada" };', 'printf("%s", user.name);'),
            codeBlock('User *user = malloc(sizeof(User));', 'user->id = 1;', 'free(user);')
          ]
        },
        {
          id: 'lang-cpp-vectors',
          title: 'C++: vectors',
          desc: 'Build fluency with includes, templates and the standard vector container.',
          tip: 'Angle brackets and double colons are frequent. Keep the shift reaches small and precise.',
          coach: 'Read the template type before the variable. The shape is include, declare, iterate.',
          targetWpm: 24,
          targetAccuracy: 96,
          focus: ['std::', '<>', 'vector', 'loop'],
          drills: [
            codeBlock('#include <iostream>', '#include <vector>', '', 'int main() {', '    std::vector<int> values = {3, 5, 8};', '    for (int value : values) {', '        std::cout << value << std::endl;', '    }', '    return 0;', '}'),
            codeBlock('std::vector<std::string> names = {"Ada", "Linus"};', 'names.push_back("Grace");', 'std::cout << names.size();')
          ]
        },
        {
          id: 'lang-cpp-classes',
          title: 'C++: classes',
          desc: 'Type constructors, access sections and const member functions.',
          tip: 'Colons introduce access and initializer lists. Keep the punctuation deliberate.',
          coach: 'C++ class syntax stacks modifiers. Read each line as a small declaration, not a single long expression.',
          targetWpm: 24,
          targetAccuracy: 96,
          focus: ['class', 'public:', 'const', '::'],
          drills: [
            codeBlock('class Counter {', 'public:', '    Counter() : count(0) {}', '    void increment() { count += 1; }', '    int value() const { return count; }', 'private:', '    int count;', '};'),
            codeBlock('Counter counter;', 'counter.increment();', 'std::cout << counter.value() << std::endl;')
          ]
        }
      ]
    },
    {
      number: '03',
      title: 'Java & Kotlin',
      lessons: [
        {
          id: 'lang-java-classes',
          title: 'Java: classes',
          desc: 'Practice access modifiers, constructors and methods in a Java class.',
          tip: 'Capitalization matters in Java. Keep the class type and the method return type aligned.',
          coach: 'Java is verbose but predictable. Type the visibility and return type before the method name.',
          targetWpm: 25,
          targetAccuracy: 96,
          focus: ['public', 'class', 'String', 'return'],
          drills: [
            codeBlock('public class User {', '    private final String name;', '', '    public User(String name) {', '        this.name = name;', '    }', '', '    public String greet() {', '        return "Hello, " + name;', '    }', '}'),
            codeBlock('public class Main {', '    public static void main(String[] args) {', '        User user = new User("Ada");', '        System.out.println(user.greet());', '    }', '}')
          ]
        },
        {
          id: 'lang-java-collections',
          title: 'Java: collections',
          desc: 'Type generics, lists, maps and the loops that walk them.',
          tip: 'Generics use angle brackets. Let the type name settle before the variable name.',
          coach: 'Read the collection type first, then the values. The angle brackets should feel like one small pair.',
          targetWpm: 25,
          targetAccuracy: 96,
          focus: ['List', 'Map', '<>', 'for'],
          drills: [
            codeBlock('import java.util.List;', '', 'public class Main {', '    public static void main(String[] args) {', '        List<String> names = List.of("Ada", "Linus");', '        for (String name : names) {', '            System.out.println(name);', '        }', '    }', '}'),
            codeBlock('Map<String, Integer> scores = new HashMap<>();', 'scores.put("Ada", 42);', 'scores.put("Linus", 37);', 'System.out.println(scores.get("Ada"));')
          ]
        },
        {
          id: 'lang-kotlin-basics',
          title: 'Kotlin: basics',
          desc: 'Type values, variables and string interpolation with Kotlin’s light syntax.',
          tip: 'Kotlin drops the semicolon. Let the line end cleanly without adding a habit from Java.',
          coach: 'Kotlin is compact. Keep the val and var distinction in your head before the name arrives.',
          targetWpm: 25,
          targetAccuracy: 96,
          focus: ['fun', 'val', 'var', '$name'],
          drills: [
            codeBlock('fun main() {', '    val name = "Ada"', '    var count = 0', '    count += 1', '    println("Hello, $name")', '}'),
            codeBlock('data class User(val name: String, val active: Boolean)', '', 'val user = User("Ada", true)', 'println(user.name)')
          ]
        },
        {
          id: 'lang-kotlin-null-safety',
          title: 'Kotlin: null safety',
          desc: 'Practice safe calls, Elvis expressions and nullable types.',
          tip: 'Question marks and colons are the whole lesson. Type them as deliberate pairs.',
          coach: 'Null safety is punctuation-heavy. Say the safe-call pattern to yourself before typing it.',
          targetWpm: 26,
          targetAccuracy: 96,
          focus: ['?', '?:', '?.', 'null'],
          drills: [
            codeBlock('fun length(value: String?): Int {', '    return value?.length ?: 0', '}'),
            codeBlock('val name: String? = null', 'val display = name ?: "Anonymous"', 'println(display)')
          ]
        }
      ]
    },
    {
      number: '04',
      title: 'C# & Swift',
      lessons: [
        {
          id: 'lang-csharp-classes',
          title: 'C#: classes',
          desc: 'Practice properties, interpolation and a small C# class.',
          tip: 'Property accessors combine braces and semicolons. Keep the get/set pair together.',
          coach: 'C# reads like Java with more symbols. Slow down inside the property block.',
          targetWpm: 26,
          targetAccuracy: 96,
          focus: ['using', 'class', 'get; set;', '$""'],
          drills: [
            codeBlock('using System;', '', 'public class User {', '    public string Name { get; set; }', '', '    public string Greet() {', '        return $"Hello, {Name}";', '    }', '}'),
            codeBlock('var user = new User { Name = "Ada" };', 'Console.WriteLine(user.Greet());')
          ]
        },
        {
          id: 'lang-csharp-linq',
          title: 'C#: LINQ',
          desc: 'Type fluent queries with lambdas, dots and method chains.',
          tip: 'A query is a chain. Keep each method call on its own line and trust the dot.',
          coach: 'LINQ is about reading the chain. The arrow and method names are the difficult symbols.',
          targetWpm: 26,
          targetAccuracy: 96,
          focus: ['LINQ', '=>', '.Where', '.Select'],
          drills: [
            codeBlock('using System.Linq;', '', 'var active = users', '    .Where(user => user.Active)', '    .OrderBy(user => user.Name)', '    .ToList();'),
            codeBlock('var totals = orders', '    .GroupBy(order => order.UserId)', '    .Select(group => new { Id = group.Key, Total = group.Sum(o => o.Amount) });')
          ]
        },
        {
          id: 'lang-swift-optionals',
          title: 'Swift: optionals',
          desc: 'Practice guard let, optional types and the nil-coalescing operator.',
          tip: 'Optional types add a question mark. The coalescing operator is a double question mark.',
          coach: 'Swift optionals are structural. Type the guard clause as one complete sentence.',
          targetWpm: 26,
          targetAccuracy: 96,
          focus: ['String?', 'guard let', '??', 'nil'],
          drills: [
            codeBlock('func greeting(name: String?) -> String {', '    guard let name = name else {', '        return "Hello, stranger"', '    }', '    return "Hello, " + name', '}'),
            codeBlock('let score: Int? = nil', 'let finalScore = score ?? 0', 'print(finalScore)')
          ]
        },
        {
          id: 'lang-swift-structs',
          title: 'Swift: structs',
          desc: 'Type struct members, initializers and collection transforms.',
          tip: 'Swift reads naturally. Keep the labels and the argument values together.',
          coach: 'Memberwise initialization uses the same names as the fields. Say the struct shape first.',
          targetWpm: 26,
          targetAccuracy: 96,
          focus: ['struct', 'let', 'var', 'reduce'],
          drills: [
            codeBlock('struct User {', '    let name: String', '    var active: Bool', '}', '', 'let user = User(name: "Ada", active: true)', 'print(user.name)'),
            codeBlock('var scores = [12, 8, 30]', 'let total = scores.reduce(0, +)', 'print(total)')
          ]
        }
      ]
    },
    {
      number: '05',
      title: 'Ruby & PHP',
      lessons: [
        {
          id: 'lang-ruby-blocks',
          title: 'Ruby: blocks',
          desc: 'Practice do/end blocks, pipes and interpolation without the extra punctuation.',
          tip: 'Blocks open with do and close with end. Keep the variable between the pipes visible.',
          coach: 'Ruby is quiet punctuation. Let the block structure carry the line instead of rushing.',
          targetWpm: 25,
          targetAccuracy: 96,
          focus: ['do', '|x|', 'end', '#{}'],
          drills: [
            codeBlock('names = ["Ada", "Linus", "Grace"]', '', 'names.each do |name|', '  puts "Hello, #{name}"', 'end'),
            codeBlock('numbers = [1, 2, 3, 4]', 'evens = numbers.select { |n| n.even? }', 'puts evens')
          ]
        },
        {
          id: 'lang-ruby-classes',
          title: 'Ruby: classes',
          desc: 'Type initialize, instance variables and small methods.',
          tip: 'Instance variables start with @. Keep the at-sign attached to the name.',
          coach: 'Ruby class bodies have little ceremony. Read the method names and let the indentation guide you.',
          targetWpm: 25,
          targetAccuracy: 96,
          focus: ['class', 'def', '@name', 'end'],
          drills: [
            codeBlock('class User', '  def initialize(name)', '    @name = name', '  end', '', '  def greet', '    "Hello, #{@name}"', '  end', 'end'),
            codeBlock('user = User.new("Ada")', 'puts user.greet')
          ]
        },
        {
          id: 'lang-php-arrays',
          title: 'PHP: arrays',
          desc: 'Practice dollar variables, associative arrays and foreach loops.',
          tip: 'The dollar sign is part of every variable. Keep the arrow fat and deliberate.',
          coach: 'PHP pairs dollars and arrows. Read a variable as one chunk before you type it.',
          targetWpm: 24,
          targetAccuracy: 96,
          focus: ['$', '=>', 'foreach', '[]'],
          drills: [
            codeBlock('<?php', '$names = ["Ada", "Linus", "Grace"];', 'foreach ($names as $name) {', '    echo "Hello, $name";', '}', '?>'),
            codeBlock('<?php', '$user = [', '    "name" => "Ada",', '    "active" => true,', '];', 'echo $user["name"];', '?>')
          ]
        },
        {
          id: 'lang-php-functions',
          title: 'PHP: functions',
          desc: 'Type typed parameters, return types and default values.',
          tip: 'The colon before the return type comes after the parameter list. Do not rush the closing parenthesis.',
          coach: 'PHP functions combine C-style parameters with arrow returns. Keep the type and the name clear.',
          targetWpm: 24,
          targetAccuracy: 96,
          focus: ['function', 'int', 'return', '?>'],
          drills: [
            codeBlock('<?php', 'function add(int $a, int $b): int {', '    return $a + $b;', '}', '', 'echo add(2, 3);', '?>'),
            codeBlock('<?php', 'function greet(string $name = "stranger"): string {', '    return "Hello, " . $name;', '}', 'echo greet("Ada");', '?>')
          ]
        }
      ]
    },
    {
      number: '06',
      title: 'Lua & R',
      lessons: [
        {
          id: 'lang-lua-tables',
          title: 'Lua: tables',
          desc: 'Practice table constructors, keys and the Lua dot lookup.',
          tip: 'Tables use curly braces, and fields are separated by commas. Keep the nested values short.',
          coach: 'Lua is light on punctuation. The table is the structure; let the commas do the work.',
          targetWpm: 24,
          targetAccuracy: 96,
          focus: ['local', '{}', '.', 'comma'],
          drills: [
            codeBlock('local user = {', '  name = "Ada",', '  active = true,', '  score = 42,', '}', '', 'print(user.name)'),
            codeBlock('local names = { "Ada", "Linus", "Grace" }', 'for index, name in ipairs(names) do', '  print(index, name)', 'end')
          ]
        },
        {
          id: 'lang-lua-functions',
          title: 'Lua: functions',
          desc: 'Type local functions, returns and string concatenation.',
          tip: 'Lua uses two dots for concatenation and the keyword end to close a function.',
          coach: 'Read the function keyword and local together. The ending is always end.',
          targetWpm: 24,
          targetAccuracy: 96,
          focus: ['function', 'end', '..', 'return'],
          drills: [
            codeBlock('local function greet(name)', '  return "Hello, " .. name', 'end', '', 'print(greet("Ada"))'),
            codeBlock('local function add(a, b)', '  return a + b', 'end', '', 'print(add(2, 3))')
          ]
        },
        {
          id: 'lang-r-vectors',
          title: 'R: vectors',
          desc: 'Practice vector creation, assignment and the built-in summary functions.',
          tip: 'The assignment arrow is a less-than sign followed by a hyphen. Type it as one motion.',
          coach: 'R reads left to right. The assignment arrow is the main reach; keep it clean.',
          targetWpm: 25,
          targetAccuracy: 96,
          focus: ['<-', 'c()', 'sum()', 'mean()'],
          drills: [
            codeBlock('values <- c(3, 5, 8, 13)', 'total <- sum(values)', 'mean_value <- mean(values)', 'print(total)', 'print(mean_value)'),
            codeBlock('scores <- c(42, 37, 51)', 'scores <- scores + 1', 'print(scores)')
          ]
        },
        {
          id: 'lang-r-dataframes',
          title: 'R: data frames',
          desc: 'Type data.frame calls and the dollar lookup that follows them.',
          tip: 'The dollar sign reaches a column. Keep the frame initialization formatted across lines.',
          coach: 'Data frames are tables. Type the column names and vectors together, then use the dollar sign to inspect them.',
          targetWpm: 25,
          targetAccuracy: 96,
          focus: ['data.frame', '$', 'c()', 'comma'],
          drills: [
            codeBlock('users <- data.frame(', '  name = c("Ada", "Linus", "Grace"),', '  score = c(42, 37, 51)', ')', '', 'print(users$name)'),
            codeBlock('active <- users[users$score > 40, ]', 'print(active)')
          ]
        }
      ]
    }
  ];

  function createLessons(units, track) {
    let runningNumber = 0;
    return units.flatMap((unit, unitIndex) =>
      unit.lessons.map((lesson, lessonIndex) => {
        runningNumber += 1;
        return {
          ...lesson,
          track,
          isCode: track !== 'general',
          unitNumber: unit.number,
          unitTitle: unit.title,
          unitIndex,
          lessonIndex,
          number: runningNumber
        };
      })
    );
  }

  const GENERAL_LESSONS = createLessons(UNITS, 'general');
  const CODE_LESSONS = createLessons(CODE_UNITS, 'code');
  const LANGUAGE_LESSONS = createLessons(LANGUAGE_UNITS, 'languages');
  const ALL_LESSONS = [...GENERAL_LESSONS, ...CODE_LESSONS, ...LANGUAGE_LESSONS];
  const CODE_STYLE_LESSONS = [...CODE_LESSONS, ...LANGUAGE_LESSONS];
  const TRACKS = {
    general: {
      id: 'general',
      label: 'Everyday',
      pathLabel: 'Everyday path',
      units: UNITS,
      lessons: GENERAL_LESSONS
    },
    code: {
      id: 'code',
      label: 'Code lab',
      pathLabel: 'Coding path',
      units: CODE_UNITS,
      lessons: CODE_LESSONS
    },
    languages: {
      id: 'languages',
      label: 'Language lab',
      pathLabel: 'Language path',
      units: LANGUAGE_UNITS,
      lessons: LANGUAGE_LESSONS
    }
  };
  const LESSON_BY_ID = new Map(ALL_LESSONS.map((lesson) => [lesson.id, lesson]));

  const WORD_BANK = `
    about above across act action after again against age ago all almost along already also although always among
    an and another any appear apply area around as ask at away back be because become been before begin being below
    between both box brave breeze bright build but by call calm can case cave change city clean clever close could
    course day did different do does done down during each early earth easy end even every example eye face fact
    fall family far feel few field file find first five flow follow food for force form found from fruit get give
    glad glass go good great group grow had hand happen happy hard have he head hear help her here high him his
    home hour house how idea if important in inside into is it its jazz jig join joke judge juice jump just keep
    kid kind know land large last late learn leave left less let life light like line list little live long look
    love low make man many may me mean meet might mind minute miss mix more morning most move much must my name near
    need never new next nice night no not now number of off often on once one only open or other our out over own
    pack page part pass past people place plan play point possible power present problem proper put question quick
    quiet quite quote reach read ready real really right rise rhythm room run said salad same say school see seem
    sentence set she should show side simple since slide slow small so some sound speed start state stay steady still
    stop story such take talk teach tell text than that the their them then there these they thing think this those
    though thought three through time to today together too toward trust try turn two under until up us use useful
    very view visit wait walk want was watch water way we week well went were what when where which while who why
    will with word work world would write year yes yet you young your zero zebra zone zoom quartz quiz vex waltz
    nymph five dozen liquor wizards vixens dozy fowl quack sphinx black
  `.trim().split(/\s+/);

  const PUNCTUATION_FALLBACK =
    "Ready, set, go. Don't rush; keep it calm. Start slow, stay light, and let the line flow.";

  const NARRATIVE_UNITS = new Set(['Flow', 'Real-world text', 'Voice & rhythm', 'Long form']);
  const RANDOM_SENTENCES = [...new Set(
    GENERAL_LESSONS
      .filter((lesson) => NARRATIVE_UNITS.has(lesson.unitTitle))
      .flatMap((lesson) => lesson.drills)
      .flatMap((text) => text.split(/(?<=[.!?])\s+/))
      .map((sentence) => sentence.trim())
      .filter((sentence) => {
        const words = sentence.split(/\s+/).length;
        return words >= 8
          && sentence.length >= 55
          && sentence.length <= 180
          && /[.!?]$/.test(sentence)
          && !sentence.includes('@')
          && !sentence.includes('://')
          && !/^[-*\d]/.test(sentence);
      })
  )];

  function trackName(track) {
    if (track === 'random') return 'Random';
    return TRACKS[track]?.label || 'Everyday';
  }

  function buildCodeSmartDrill(keys) {
    const tokens = keys.filter((key) => key !== '\n' && key !== ' ');
    const drills = CODE_STYLE_LESSONS.flatMap((lesson) => lesson.drills).map((drill) => {
      const score = tokens.reduce((total, token) => {
        const hits = [...drill].filter((char) => char === token).length;
        return total + hits;
      }, 0);
      const uniqueHits = tokens.filter((token) => drill.includes(token)).length;
      return { drill, score: score + uniqueHits * 4 };
    }).sort((a, b) => b.score - a.score);

    const best = drills[0];
    if (!best || best.score === 0) {
      return codeBlock('const ready = true;', 'if (!ready) return null;', 'return { status: "ok" };');
    }
    if (best.drill.length <= 220) return best.drill;

    const lines = best.drill.split('\n');
    const shortened = [];
    let length = 0;
    for (const line of lines) {
      if (length + line.length > 160 && shortened.length >= 2) break;
      shortened.push(line);
      length += line.length + 1;
    }
    return shortened.join('\n');
  }

  const KEY_FINGER = {
    '`': 'pinky', '1': 'pinky', '2': 'ring', '3': 'middle', '4': 'index', '5': 'index',
    '6': 'index', '7': 'index', '8': 'middle', '9': 'ring', '0': 'pinky', '-': 'pinky', '=': 'pinky',
    'q': 'pinky', 'w': 'ring', 'e': 'middle', 'r': 'index', 't': 'index', 'y': 'index',
    'u': 'index', 'i': 'middle', 'o': 'ring', 'p': 'pinky', '[': 'pinky', ']': 'pinky', '\\': 'pinky',
    'a': 'pinky', 's': 'ring', 'd': 'middle', 'f': 'index', 'g': 'index', 'h': 'index',
    'j': 'index', 'k': 'middle', 'l': 'ring', ';': 'pinky', "'": 'pinky',
    'z': 'pinky', 'x': 'ring', 'c': 'middle', 'v': 'index', 'b': 'index', 'n': 'index',
    'm': 'index', ',': 'middle', '.': 'ring', '/': 'pinky',
    'space': 'thumb', 'enter': 'pinky', 'shift-left': 'pinky', 'shift-right': 'pinky'
  };

  const LEFT_KEYS = new Set(['`', '1', '2', '3', '4', '5', 'q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b']);

  const FINGER_COLORS = {
    pinky: 'var(--finger-pinky)',
    ring: 'var(--finger-ring)',
    middle: 'var(--finger-middle)',
    index: 'var(--finger-index)',
    thumb: 'var(--finger-thumb)'
  };

  const SHIFT_MAP = {
    '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8',
    '(': '9', ')': '0', '_': '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'",
    '<': ',', '>': '.', '?': '/'
  };

  const KEY_ROWS = [
    [
      ['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'],
      ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+']
    ],
    [
      ['q'], ['w'], ['e'], ['r'], ['t'], ['y'], ['u'], ['i'], ['o'], ['p'], ['[', '{'], [']', '}'], ['\\', '|']
    ],
    [
      ['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l'], [';', ':'], ["'", '"'], ['enter']
    ],
    [
      ['shift-left'], ['z'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], [',', '<'], ['.', '>'], ['/', '?'], ['shift-right']
    ],
    [
      ['space']
    ]
  ];

  const KEY_LABELS = {
    enter: 'Enter',
    'shift-left': 'Shift',
    'shift-right': 'Shift',
    space: 'space'
  };

  const SPECIAL_KEY_LABELS = {
    ' ': 'Space',
    ';': ';',
    "'": "'",
    ',': ',',
    '.': '.',
    '/': '/',
    '\\': '\\',
    '[': '[',
    ']': ']',
    '-': '-',
    '=': '=',
    '`': '`'
  };

  /* =========================================================
     State / storage
     ========================================================= */

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const el = {
    navLinks: $$('.nav-link'),
    views: $$('[data-view-panel]'),
    crumbRoot: $('#crumbRoot'),
    crumbCurrent: $('#crumbCurrent'),
    pathPercent: $('#pathPercent'),
    pathLabel: $('#pathLabel'),
    pathLabelMirror: $('#pathLabelMirror'),
    coursePercent: $('#coursePercent'),
    pathFill: $('#pathFill'),
    courseDialog: $('#courseDialog'),
    closeCourse: $('#closeCourse'),
    coursePath: $('#coursePath'),
    consentDialog: $('#consentDialog'),
    consentStatus: $('#consentStatus'),
    consentDetails: $('#consentDetails'),
    consentDetailsBtn: $('#consentDetailsBtn'),
    consentAllow: $('#consentAllow'),
    consentEssential: $('#consentEssential'),
    closeConsent: $('#closeConsent'),
    privacyBtn: $('#privacyBtn'),
    trackTabs: $$('.track-tab'),
    codeTag: $('#codeTag'),
    sideStreak: $('#sideStreak'),
    revealBtns: $$('[data-reveal]'),
    revealSwitch: $('#revealSwitch'),
    typingModeHint: $('#typingModeHint'),
    topStreak: $('#topStreak'),
    streakPill: $('#streakPill'),
    soundBtn: $('#soundBtn'),
    strictBtn: $('#strictBtn'),
    lessonUnit: $('#lessonUnit'),
    lessonNumber: $('#lessonNumber'),
    lessonTitle: $('#lessonTitle'),
    lessonDesc: $('#lessonDesc'),
    focusChips: $('#focusChips'),
    restartBtn: $('#restartBtn'),
    randomBtn: $('#randomBtn'),
    typingCard: $('#typingCard'),
    typeViewport: $('#typeViewport'),
    typeText: $('#typeText'),
    typingInput: $('#typingInput'),
    focusVeil: $('#focusVeil'),
    runStatus: $('#runStatus'),
    runMeta: $('#runMeta'),
    cardProgress: $('#cardProgress'),
    nextKeyLabel: $('#nextKeyLabel'),
    fingerHint: $('#fingerHint'),
    keyboard: $('#keyboard'),
    wpm: $('#wpm'),
    wpmTarget: $('#wpmTarget'),
    accuracy: $('#accuracy'),
    timer: $('#timer'),
    combo: $('#combo'),
    goalValue: $('#goalValue'),
    goalFill: $('#goalFill'),
    coachText: $('#coachText'),
    weakBlock: $('#weakBlock'),
    weakKeys: $('#weakKeys'),
    smartDrillBtn: $('#smartDrillBtn'),
    lessonTip: $('#lessonTip'),
    progressSmartBtn: $('#progressSmartBtn'),
    metricBestWpm: $('#metricBestWpm'),
    metricBestFoot: $('#metricBestFoot'),
    metricAccuracy: $('#metricAccuracy'),
    metricAccuracyFoot: $('#metricAccuracyFoot'),
    metricTime: $('#metricTime'),
    metricLessons: $('#metricLessons'),
    metricLessonsTotal: $('#metricLessonsTotal'),
    metricStreakFoot: $('#metricStreakFoot'),
    speedChart: $('#speedChart'),
    weakKeyList: $('#weakKeyList'),
    weakDrillBtn: $('#weakDrillBtn'),
    activityCalendar: $('#activityCalendar'),
    calendarMeta: $('#calendarMeta'),
    recordList: $('#recordList'),
    recordsMeta: $('#recordsMeta'),
    sessionList: $('#sessionList'),
    clearHistoryBtn: $('#clearHistoryBtn'),
    summaryDialog: $('#summaryDialog'),
    summaryEyebrow: $('#summaryEyebrow'),
    summaryStars: $('#summaryStars'),
    summaryHeadline: $('#summaryHeadline'),
    summaryNote: $('#summaryNote'),
    summaryPb: $('#summaryPb'),
    summaryWpm: $('#summaryWpm'),
    summaryAccuracy: $('#summaryAccuracy'),
    summaryTime: $('#summaryTime'),
    summaryCoach: $('#summaryCoach'),
    summaryWeak: $('#summaryWeak'),
    summaryWeakKeys: $('#summaryWeakKeys'),
    nextLessonBtn: $('#nextLessonBtn'),
    retryBtn: $('#retryBtn'),
    closeSummary: $('#closeSummary'),
    summaryProgressBtn: $('#summaryProgressBtn'),
    resetDialog: $('#resetDialog'),
    cancelReset: $('#cancelReset'),
    confirmReset: $('#confirmReset'),
    resetTitle: $('#resetTitle'),
    commandTrigger: $('#commandTrigger'),
    commandDialog: $('#commandDialog'),
    commandInput: $('#commandInput'),
    commandList: $('#commandList'),
    commandShortcut: $('#commandShortcut'),
    guideKeyboard: $('#guideKeyboard'),
    guideStartBtn: $('#guideStartBtn'),
    guideCtaBtn: $('#guideCtaBtn'),
    toast: $('#toast')
  };

  const REVEAL_LOOKAHEAD = 5;
  const defaultProgress = () => ({
    version: 3,
    lessons: {},
    history: [],
    dailySeconds: {},
    totalSeconds: 0,
    settings: { sound: false, strict: false, reveal: 'letters' },
    lastLesson: null,
    lastLessons: { general: null, code: null, languages: null }
  });

  function normalizeProgress(raw) {
    const base = defaultProgress();
    if (!raw || typeof raw !== 'object') return base;
    if (raw.lessons && typeof raw.lessons === 'object') base.lessons = raw.lessons;
    if (Array.isArray(raw.history)) base.history = raw.history.slice(-MAX_HISTORY);
    if (raw.dailySeconds && typeof raw.dailySeconds === 'object') base.dailySeconds = raw.dailySeconds;
    if (Number.isFinite(raw.totalSeconds)) base.totalSeconds = Math.max(0, raw.totalSeconds);
    if (raw.settings && typeof raw.settings === 'object') {
      base.settings.sound = Boolean(raw.settings.sound);
      base.settings.strict = Boolean(raw.settings.strict);
      const reveal = raw.settings.reveal;
      base.settings.reveal = reveal === 'line'
        ? 'line'
        : reveal === 'one'
          ? 'one'
          : 'letters';
    }
    if (raw.lastLessons && typeof raw.lastLessons === 'object') {
      Object.keys(TRACKS).forEach((track) => {
        const candidate = raw.lastLessons[track];
        if (typeof candidate === 'string' && LESSON_BY_ID.get(candidate)?.track === track) {
          base.lastLessons[track] = candidate;
        }
      });
    }
    if (typeof raw.lastLesson === 'string' && LESSON_BY_ID.has(raw.lastLesson)) {
      base.lastLesson = raw.lastLesson;
      const lesson = LESSON_BY_ID.get(raw.lastLesson);
      if (lesson?.track) base.lastLessons[lesson.track] = lesson.id;
    }
    return base;
  }

  function readConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed?.version !== CONSENT_VERSION || typeof parsed.preferences !== 'boolean') return null;
      return parsed;
    } catch {
      return null;
    }
  }

  let consent = readConsent();

  function hasStorageConsent() {
    return consent?.preferences === true;
  }

  function loadProgress() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? normalizeProgress(JSON.parse(stored)) : defaultProgress();
    } catch (error) {
      return defaultProgress();
    }
  }

  function saveProgress() {
    if (!hasStorageConsent()) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      /* Storage can be unavailable in private or file contexts. The app still works. */
    }
  }

  function consentStatusText() {
    if (!consent) return 'No preference saved yet.';
    return consent.preferences
      ? 'Progress storage is on for this browser.'
      : 'Essential only — progress is not saved.';
  }

  function updateConsentUI() {
    el.consentStatus.textContent = consentStatusText();
    el.consentDetails.hidden = true;
    el.consentDetailsBtn.setAttribute('aria-expanded', 'false');
    el.consentDetailsBtn.textContent = 'What is stored?';
  }

  function openConsentDialog() {
    if (el.consentDialog.open) {
      el.consentAllow.focus();
      return;
    }
    closeDialogIfOpen(el.commandDialog);
    closeDialogIfOpen(el.summaryDialog);
    closeDialogIfOpen(el.resetDialog);
    closeCourseMap();
    updateConsentUI();
    if (typeof el.consentDialog.showModal === 'function') {
      el.consentDialog.showModal();
      setTimeout(() => el.consentAllow.focus(), 30);
    }
    hideFocusVeil();
  }

  function setConsent(preferences) {
    const hadStorage = hasStorageConsent();
    consent = {
      version: CONSENT_VERSION,
      preferences: Boolean(preferences),
      updatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch {
      /* The choice still applies for this session. */
    }
    if (consent.preferences) {
      saveProgress();
      showToast('Progress storage on.');
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* Nothing else to remove. */
      }
      showToast(hadStorage
        ? 'Progress storage off. Saved data removed.'
        : 'Essential only. Progress will not be saved.');
    }
    el.consentDialog.close();
    if (state.view === 'practice') setTimeout(focusPad, 20);
  }

  let progress = loadProgress();

  const state = {
    view: 'practice',
    track: 'general',
    lesson: null,
    isSmart: false,
    isRandom: false,
    lastRandomText: '',
    target: '',
    focusDisplay: [],
    index: 0,
    typed: [],
    attempts: 0,
    correctAttempts: 0,
    combo: 0,
    bestCombo: 0,
    misses: {},
    active: false,
    started: false,
    finished: false,
    elapsedMs: 0,
    lastTick: 0,
    timerId: null,
    charNodes: [],
    keyEls: new Map(),
    lastDrillText: '',
    lastRun: null,
    summaryData: null,
    toastTimer: null,
    summaryTimer: null,
    pendingNext: null,
    audioContext: null,
    visibilityHandlerBound: false,
    commandItems: [],
    commandFiltered: [],
    commandIndex: 0
  };

  /* =========================================================
     Small helpers
     ========================================================= */

  function formatClock(totalSeconds) {
    const safe = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(safe / 60);
    const seconds = String(safe % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function localDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function shortDate(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  }

  function sessionDateLabel(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return 'Unknown';
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const key = localDateKey(date);
    if (key === localDateKey(today)) {
      return `Today · ${new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(date)}`;
    }
    if (key === localDateKey(yesterday)) return 'Yesterday';
    return shortDate(date);
  }

  function plural(value, singular, pluralForm = `${singular}s`) {
    return `${value} ${value === 1 ? singular : pluralForm}`;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function displayChar(char) {
    if (char === ' ') return 'Space';
    if (char === '\n') return 'Enter';
    return char;
  }

  function displayKey(char) {
    if (char === ' ') return 'Space';
    if (char === '\n') return 'Enter';
    if (/^[a-z]$/i.test(char)) return char.toUpperCase();
    return char;
  }

  function keyInfoForChar(char) {
    if (char === ' ') return { key: 'space', shift: false, finger: 'thumb', label: 'Space' };
    if (char === '\n') return { key: 'enter', shift: false, finger: 'pinky', label: 'Enter' };
    if (SHIFT_MAP[char]) {
      const base = SHIFT_MAP[char];
      return { key: base, shift: true, finger: KEY_FINGER[base] || 'pinky', label: char };
    }
    if (/^[A-Z]$/.test(char)) {
      const base = char.toLowerCase();
      return { key: base, shift: true, finger: KEY_FINGER[base] || 'index', label: char };
    }
    return { key: char, shift: false, finger: KEY_FINGER[char] || 'index', label: displayKey(char) };
  }

  function fingerDescription(key, shift) {
    const finger = KEY_FINGER[key] || 'index';
    if (key === 'space') return { text: 'Thumb · space bar', color: FINGER_COLORS.thumb };
    const side = LEFT_KEYS.has(key) ? 'Left' : 'Right';
    const shiftSide = side === 'Left' ? 'right' : 'left';
    return {
      text: shift
        ? `${side} ${finger} + ${shiftSide} pinky on Shift`
        : `${side} ${finger} finger`,
      color: FINGER_COLORS[finger] || FINGER_COLORS.index
    };
  }

  function allMisses() {
    const totals = {};
    progress.history.forEach((run) => {
      if (!run || !run.misses || typeof run.misses !== 'object') return;
      Object.entries(run.misses).forEach(([char, count]) => {
        if (!Number.isFinite(Number(count))) return;
        totals[char] = (totals[char] || 0) + Number(count);
      });
    });
    return totals;
  }

  function weakKeys(limit = 6) {
    return Object.entries(allMisses())
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([char, count]) => ({ char, count }));
  }

  function currentStreak() {
    const days = progress.dailySeconds || {};
    const cursor = new Date();
    if (!days[localDateKey(cursor)]) {
      cursor.setDate(cursor.getDate() - 1);
      if (!days[localDateKey(cursor)]) return 0;
    }
    let streak = 0;
    while (days[localDateKey(cursor)] && streak < 3660) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function completedForTrack(track) {
    const lessons = TRACKS[track]?.lessons || [];
    return lessons.filter((lesson) => {
      const record = progress.lessons[lesson.id];
      return record && record.attempts > 0;
    }).length;
  }

  function lessonsCompleted() {
    return ALL_LESSONS.filter((lesson) => {
      const record = progress.lessons[lesson.id];
      return record && record.attempts > 0;
    }).length;
  }

  function firstIncompleteLesson(track = 'general') {
    const lessons = TRACKS[track]?.lessons || GENERAL_LESSONS;
    return lessons.find((lesson) => {
      const record = progress.lessons[lesson.id];
      return !record || !record.attempts;
    }) || lessons[lessons.length - 1];
  }

  function nextLessonInTrack(lesson) {
    if (!lesson) return null;
    const lessons = TRACKS[lesson.track]?.lessons || [];
    const index = lessons.findIndex((candidate) => candidate.id === lesson.id);
    return index >= 0 ? lessons[index + 1] || null : null;
  }

  function updateTrackUI() {
    const track = TRACKS[state.track] ? state.track : 'general';
    const isRandom = state.isRandom;
    el.trackTabs.forEach((tab) => {
      const active = !isRandom && tab.dataset.track === track;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    el.pathLabel.textContent = isRandom ? 'Free practice' : TRACKS[track].pathLabel;
    if (el.pathLabelMirror) el.pathLabelMirror.textContent = TRACKS[track].pathLabel;
    document.body.classList.toggle('is-code-track', !isRandom && track !== 'general');
    document.body.classList.toggle('is-random', isRandom);
    document.body.dataset.track = track;
  }

  /* =========================================================
     UI state
     ========================================================= */

  function setRunStatus(label, mode = '') {
    const dotClass = mode === 'finished' ? 'status-dot is-finished' : 'status-dot';
    el.runStatus.innerHTML = `<span class="${dotClass}" aria-hidden="true"></span> ${label}`;
  }

  function updateToggleUI() {
    el.soundBtn.classList.toggle('is-on', progress.settings.sound);
    el.soundBtn.setAttribute('aria-pressed', String(progress.settings.sound));
    el.soundBtn.title = progress.settings.sound ? 'Key sounds on' : 'Key sounds off';
    el.strictBtn.classList.toggle('is-on', progress.settings.strict);
    el.strictBtn.setAttribute('aria-pressed', String(progress.settings.strict));
    el.strictBtn.title = progress.settings.strict ? 'Strict mode on — backspace is disabled' : 'Strict mode off';
  }

  function updateRevealUI() {
    const mode = ['one', 'line'].includes(progress.settings.reveal)
      ? progress.settings.reveal
      : 'letters';
    el.revealBtns.forEach((button) => {
      const active = button.dataset.reveal === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (el.typingModeHint) {
      el.typingModeHint.textContent = mode === 'line'
        ? 'Full line visible'
        : mode === 'one'
          ? 'Only the current letter is visible'
          : `Current + next ${REVEAL_LOOKAHEAD} letters visible`;
    }
  }

  function setRevealMode(mode) {
    if (!['one', 'letters', 'line'].includes(mode) || progress.settings.reveal === mode) {
      focusPad();
      return;
    }
    progress.settings.reveal = mode;
    saveProgress();
    updateRevealUI();
    paintTyping();
    showToast(mode === 'line'
      ? 'Full line visible.'
      : mode === 'one'
        ? 'Only the current letter is visible.'
        : `Current and next ${REVEAL_LOOKAHEAD} letters visible.`);
    focusPad();
  }

  function updateStreakUI() {
    const streak = currentStreak();
    el.topStreak.textContent = String(streak);
    el.sideStreak.textContent = plural(streak, 'day');
    el.streakPill.title = streak > 0 ? `${plural(streak, 'day')} in a row` : 'Practice today to start a streak';
    el.streakPill.classList.toggle('has-streak', streak > 0);
  }

  function showToast(message) {
    clearTimeout(state.toastTimer);
    el.toast.textContent = message;
    el.toast.classList.add('is-visible');
    state.toastTimer = setTimeout(() => el.toast.classList.remove('is-visible'), 2600);
  }

  function openCourseMap() {
    if (el.courseDialog.open) return;
    if (el.summaryDialog.open || el.resetDialog.open || el.commandDialog.open || el.consentDialog.open) return;
    renderPath();
    el.courseDialog.showModal();
    requestAnimationFrame(() => {
      el.coursePath.querySelector('.lesson-link.is-active')?.focus();
    });
  }

  function closeCourseMap() {
    if (el.courseDialog.open) el.courseDialog.close();
  }

  function focusPad() {
    if (state.view !== 'practice') return;
    if (el.summaryDialog.open || el.resetDialog.open || el.commandDialog.open || el.courseDialog.open || el.consentDialog.open) return;
    try {
      el.typingInput.focus({ preventScroll: true });
    } catch (error) {
      el.typingInput.focus();
    }
    hideFocusVeil();
  }

  function hideFocusVeil() {
    el.focusVeil.hidden = true;
    el.typeViewport.classList.remove('is-blurred');
  }

  function maybeShowFocusVeil() {
    if (state.view !== 'practice' || !state.active || state.finished) return;
    if (el.summaryDialog.open || el.resetDialog.open || el.commandDialog.open || el.courseDialog.open || el.consentDialog.open) return;
    if (document.activeElement === el.typingInput) return;
    el.typeViewport.classList.add('is-blurred');
    el.focusVeil.hidden = false;
  }

  function switchView(view) {
    if (!['practice', 'progress', 'guide'].includes(view)) return;
    state.view = view;
    state.lastTick = performance.now();
    el.views.forEach((panel) => {
      const isCurrent = panel.dataset.viewPanel === view;
      panel.classList.toggle('is-active', isCurrent);
      panel.hidden = !isCurrent;
    });
    el.navLinks.forEach((link) => {
      const isCurrent = link.dataset.view === view;
      link.classList.toggle('is-active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    if (view === 'practice') {
      el.crumbRoot.textContent = state.isRandom
        ? 'Random practice'
        : state.track === 'general'
          ? 'Curriculum'
          : TRACKS[state.track]?.label || 'Curriculum';
      el.crumbCurrent.textContent = state.isRandom
        ? 'Fresh text'
        : state.isSmart
          ? 'Adaptive drill'
          : state.lesson?.unitTitle || 'Practice';
      document.title = state.lesson ? `${state.lesson.title} · Keystride` : 'Keystride — Everyday typing, code & languages';
      requestAnimationFrame(focusPad);
    } else if (view === 'progress') {
      el.crumbRoot.textContent = 'Keystride';
      el.crumbCurrent.textContent = 'Progress';
      document.title = 'Progress · Keystride';
      renderProgress();
      hideFocusVeil();
    } else {
      el.crumbRoot.textContent = 'Keystride';
      el.crumbCurrent.textContent = 'Field guide';
      document.title = 'Field guide · Keystride';
      hideFocusVeil();
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /* =========================================================
     Rendering the course path
     ========================================================= */

  function renderPath() {
    updateTrackUI();
    const track = TRACKS[state.track] || TRACKS.general;
    const completeCount = completedForTrack(track.id);
    const percent = Math.round((completeCount / track.lessons.length) * 100);
    el.pathPercent.textContent = `${percent}%`;
    if (el.coursePercent) el.coursePercent.textContent = `${percent}%`;
    el.pathFill.style.width = `${percent}%`;

    let runningNumber = 0;
    const html = track.units.map((unit) => {
      const lessons = unit.lessons.map((lesson) => {
        runningNumber += 1;
        const record = progress.lessons[lesson.id];
        const complete = record && record.attempts > 0;
        const active = !state.isSmart && !state.isRandom && state.lesson?.id === lesson.id;
        const score = record?.bestWpm ? `${record.bestWpm}w` : String(runningNumber).padStart(2, '0');
        return `
          <button class="lesson-link${complete ? ' is-complete' : ''}${active ? ' is-active' : ''}"
            type="button" data-lesson-id="${lesson.id}"
            ${active ? 'aria-current="true"' : ''}>
            <span class="lesson-index">${complete ? '✓' : String(runningNumber).padStart(2, '0')}</span>
            <span class="lesson-name">${escapeHtml(lesson.title)}</span>
            <span class="lesson-score">${escapeHtml(score)}</span>
          </button>`;
      }).join('');
      return `
        <div class="unit">
          <div class="unit-title"><span>${unit.number}</span><h3>${escapeHtml(unit.title)}</h3></div>
          ${lessons}
        </div>`;
    }).join('');

    el.coursePath.innerHTML = html;
  }

  function switchTrack(track, { open = true } = {}) {
    if (!TRACKS[track]) return;
    const changed = state.track !== track || state.isRandom;
    state.isRandom = false;
    state.track = track;
    updateTrackUI();
    if (!open) {
      renderPath();
      return;
    }
    if (!changed && state.view === 'practice' && state.lesson) {
      focusPad();
      return;
    }
    const storedId = progress.lastLessons?.[track];
    const stored = storedId ? LESSON_BY_ID.get(storedId) : null;
    const lesson = stored?.track === track ? stored : firstIncompleteLesson(track);
    if (lesson) openLesson(lesson.id, { forceNewDrill: true });
    else renderPath();
  }

  /* =========================================================
     Keyboard visualization
     ========================================================= */

  function buildKeyboard(target, { tinted = false } = {}) {
    if (!target) return new Map();
    const keyEls = new Map();
    const fragment = document.createDocumentFragment();

    KEY_ROWS.forEach((row) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'kb-row';
      row.forEach((definition) => {
        const base = definition[0];
        const shift = definition[1] || '';
        const keyEl = document.createElement('div');
        keyEl.className = 'key';
        keyEl.dataset.key = base;
        if (KEY_FINGER[base]) keyEl.style.setProperty('--finger-color', FINGER_COLORS[KEY_FINGER[base]]);
        if (base === 'f' || base === 'j') keyEl.classList.add('home-key');
        if (base === 'enter' || base === 'shift-left' || base === 'shift-right') keyEl.classList.add('special');
        if (base === 'space') keyEl.classList.add('space');
        if (/^[a-z]$/.test(base)) keyEl.classList.add('letter');

        if (shift) {
          const shiftLabel = document.createElement('span');
          shiftLabel.className = 'key-shift';
          shiftLabel.textContent = shift;
          keyEl.appendChild(shiftLabel);
        }

        const baseLabel = document.createElement('span');
        baseLabel.className = 'key-base';
        baseLabel.textContent = KEY_LABELS[base] || base.toUpperCase();
        keyEl.appendChild(baseLabel);

        if (base !== 'space') {
          const dot = document.createElement('i');
          dot.className = 'key-dot';
          keyEl.appendChild(dot);
        }

        if (tinted) keyEl.classList.add('key-tinted');
        keyEls.set(base, keyEl);
        rowEl.appendChild(keyEl);
      });
      fragment.appendChild(rowEl);
    });

    target.innerHTML = '';
    target.appendChild(fragment);
    return keyEls;
  }

  function clearKeyboardHighlights() {
    state.keyEls.forEach((keyEl) => {
      keyEl.classList.remove('is-next', 'is-shift-next');
    });
    state.keyEls.forEach((keyEl) => {
      keyEl.querySelector('.key-shift')?.removeAttribute('data-active');
    });
  }

  function updateKeyboard() {
    clearKeyboardHighlights();
    if (state.finished) {
      el.nextKeyLabel.textContent = 'Done';
      el.nextKeyLabel.classList.remove('has-shift');
      el.fingerHint.replaceChildren(document.createTextNode('Nice work. Take a breath.'));
      el.keyboard.setAttribute('aria-label', 'Keyboard. Run complete.');
      return;
    }
    const nextChar = state.target[state.index];
    if (nextChar === undefined) {
      el.nextKeyLabel.textContent = '—';
      el.fingerHint.replaceChildren(document.createTextNode('Run complete'));
      return;
    }
    const info = keyInfoForChar(nextChar);
    const keyEl = state.keyEls.get(info.key);
    if (keyEl) {
      keyEl.classList.add('is-next');
      keepKeyInView(keyEl);
    }
    if (info.shift) {
      const keySide = LEFT_KEYS.has(info.key) ? 'left' : 'right';
      const shiftKey = keySide === 'left' ? 'shift-right' : 'shift-left';
      state.keyEls.get(shiftKey)?.classList.add('is-shift-next');
    }

    const shown = nextChar === ' ' ? 'Space' : info.label;
    el.nextKeyLabel.textContent = info.shift ? `Shift + ${shown}` : shown;
    el.nextKeyLabel.classList.toggle('has-shift', info.shift);

    const finger = fingerDescription(info.key, info.shift);
    const dot = document.createElement('span');
    dot.className = 'finger-dot';
    dot.style.setProperty('--finger-color', finger.color);
    el.fingerHint.replaceChildren(dot, document.createTextNode(finger.text));
    el.keyboard.setAttribute('aria-label', `Keyboard. Next key ${shown}${info.shift ? ' with Shift' : ''}. ${finger.text}.`);
  }

  function keepKeyInView(keyEl) {
    const scroller = keyEl.closest('.keyboard-scroll');
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth + 2) return;
    const keyBox = keyEl.getBoundingClientRect();
    const scrollBox = scroller.getBoundingClientRect();
    const margin = 14;
    if (keyBox.left >= scrollBox.left + margin && keyBox.right <= scrollBox.right - margin) return;
    const targetLeft = scroller.scrollLeft
      + (keyBox.left - scrollBox.left)
      - (scroller.clientWidth - keyBox.width) / 2;
    scroller.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
  }

  function flashKey(char, correct) {
    const info = keyInfoForChar(char);
    const keyEl = state.keyEls.get(info.key);
    if (!keyEl) return;
    const cls = correct ? 'hit-correct' : 'hit-miss';
    keyEl.classList.remove('hit-correct', 'hit-miss');
    // Restart the animation when the same key is pressed repeatedly.
    void keyEl.offsetWidth;
    keyEl.classList.add(cls);
    setTimeout(() => keyEl.classList.remove(cls), 170);
  }

  /* =========================================================
     Typing engine
     ========================================================= */

  function resetEngine() {
    window.clearInterval(state.timerId);
    state.timerId = null;
    state.index = 0;
    state.typed = [];
    state.attempts = 0;
    state.correctAttempts = 0;
    state.combo = 0;
    state.bestCombo = 0;
    state.misses = {};
    state.active = false;
    state.started = false;
    state.finished = false;
    state.elapsedMs = 0;
    state.lastTick = performance.now();
    el.typingCard.classList.remove('is-running', 'is-finished', 'shake');
    setRunStatus('Ready when you are');
    hideFocusVeil();
    updateRunMeta();
  }

  function renderTarget() {
    el.typeText.innerHTML = '';
    state.charNodes = [];
    const isCode = Boolean(state.lesson?.isCode);
    el.typeText.classList.toggle('is-code', isCode);
    el.typingCard.classList.toggle('is-code', isCode);
    const fragment = document.createDocumentFragment();
    const lines = state.target.split('\n');

    lines.forEach((line, lineIndex) => {
      let wordSpan = document.createElement('span');
      wordSpan.className = 'word';

      [...line].forEach((char) => {
        if (char === ' ') {
          if (wordSpan.childNodes.length) {
            fragment.appendChild(wordSpan);
            wordSpan = document.createElement('span');
            wordSpan.className = 'word';
          }
          const space = document.createElement('span');
          space.className = 'char space';
          space.textContent = ' ';
          state.charNodes.push(space);
          fragment.appendChild(space);
        } else {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = char;
          state.charNodes.push(span);
          wordSpan.appendChild(span);
        }
      });

      if (wordSpan.childNodes.length) fragment.appendChild(wordSpan);

      if (lineIndex < lines.length - 1) {
        const newline = document.createElement('span');
        newline.className = 'char newline';
        newline.textContent = '↵';
        state.charNodes.push(newline);
        fragment.appendChild(newline);
        fragment.appendChild(document.createElement('br'));
      }
    });

    el.typeText.appendChild(fragment);
    el.typeText.setAttribute('aria-label', `Practice text: ${state.target}`);
    paintTyping();
  }

  function paintTyping() {
    const mode = ['one', 'line'].includes(progress.settings.reveal)
      ? progress.settings.reveal
      : 'letters';
    const lookaheadEnd = state.index + (mode === 'letters' ? REVEAL_LOOKAHEAD : 0);

    for (let i = 0; i < state.charNodes.length; i += 1) {
      const node = state.charNodes[i];
      const char = state.target[i];
      let className = 'char';
      let display = char === '\n' ? '↵' : char;
      if (char === ' ') className += ' space';
      if (char === '\n') className += ' newline';

      if (i < state.index) {
        const typedChar = state.typed[i] ?? char;
        display = typedChar === '\n' ? '↵' : typedChar;
        if (typedChar === char) className += ' done';
        else className += ' error';
      } else if (i === state.index && !state.finished) {
        className += ' current';
      } else if (mode !== 'line') {
        if (mode === 'letters' && i <= lookaheadEnd) {
          className += ' is-ahead';
        } else {
          className += ' is-hidden';
          if (char === '\n') display = '↵';
          else if (char === ' ') display = ' ';
          else display = '·';
        }
      }

      node.className = className;
      node.textContent = display;
    }

    const ariaLabel = mode === 'line'
      ? `Practice text: ${state.target}`
      : mode === 'one'
        ? 'Practice text with one-letter reveal. Only typed characters and the current character are visible.'
        : `Practice text with limited lookahead. The current character and the next ${REVEAL_LOOKAHEAD} characters are visible.`;
    el.typeText.setAttribute('aria-label', ariaLabel);
  }

  function updateRunMeta() {
    const total = [...state.target].length;
    el.runMeta.textContent = `${Math.min(state.index, total)} / ${total}`;
    const percent = total > 0 ? (Math.min(state.index, total) / total) * 100 : 0;
    el.cardProgress.style.width = `${percent}%`;
  }

  function updateGoal() {
    const wpm = currentWpm();
    const target = state.lesson?.targetWpm || 30;
    const percent = Math.max(0, Math.min(100, Math.round((wpm / target) * 100)));
    el.goalValue.textContent = `${percent}%`;
    el.goalFill.style.width = `${percent}%`;
    el.goalFill.style.background = percent >= 100 ? 'var(--green)' : 'var(--red)';
  }

  function currentWpm() {
    if (!state.started || state.elapsedMs < 350) return 0;
    const correct = state.typed.filter((char, index) => char === state.target[index]).length;
    const minutes = state.elapsedMs / 60000;
    if (minutes <= 0) return 0;
    return Math.max(0, Math.round((correct / 5) / minutes));
  }

  function currentAccuracy() {
    if (!state.attempts) return 100;
    return Math.round((state.correctAttempts / state.attempts) * 100);
  }

  function updateStats() {
    el.wpm.textContent = String(currentWpm());
    el.accuracy.innerHTML = `${currentAccuracy()}<span>%</span>`;
    el.timer.textContent = formatClock(state.elapsedMs / 1000);
    el.combo.textContent = String(state.combo);
    updateGoal();
  }

  function startEngine() {
    if (state.active || state.finished) return;
    state.active = true;
    state.started = true;
    state.lastTick = performance.now();
    el.typingCard.classList.add('is-running');
    setRunStatus(progress.settings.strict ? 'Strict run · in flow' : 'In flow');
    hideFocusVeil();
    window.clearInterval(state.timerId);
    state.timerId = window.setInterval(() => {
      if (!state.active || state.finished) return;
      const now = performance.now();
      const delta = now - state.lastTick;
      state.lastTick = now;
      const modalOpen = el.summaryDialog.open || el.resetDialog.open || el.commandDialog.open || el.courseDialog.open || el.consentDialog.open;
      if (!modalOpen && document.visibilityState === 'visible' && document.hasFocus() && state.view === 'practice') {
        state.elapsedMs += Math.max(0, delta);
      }
      updateStats();
    }, 120);
  }

  function tickPauseClock() {
    state.lastTick = performance.now();
  }

  function handleCharacter(char) {
    if (state.view !== 'practice' || state.finished) return;
    if (el.summaryDialog.open || el.resetDialog.open || el.commandDialog.open || el.courseDialog.open || el.consentDialog.open) return;
    if (!state.started) startEngine();
    if (state.finished) return;

    const expected = state.target[state.index];
    if (expected === undefined) return;
    const correct = char === expected;

    state.typed[state.index] = char;
    state.index += 1;
    state.attempts += 1;

    if (correct) {
      state.correctAttempts += 1;
      state.combo += 1;
      state.bestCombo = Math.max(state.bestCombo, state.combo);
      playKeySound(true);
      flashKey(char, true);
    } else {
      state.combo = 0;
      state.misses[expected] = (state.misses[expected] || 0) + 1;
      playKeySound(false);
      flashKey(char, false);
      el.typingCard.classList.remove('shake');
      void el.typingCard.offsetWidth;
      el.typingCard.classList.add('shake');
    }

    paintTyping();
    updateRunMeta();
    updateStats();
    updateKeyboard();

    if (state.index >= state.target.length) {
      finishRun();
    }
  }

  function handleBackspace() {
    if (!state.started || state.finished || state.index === 0) return;
    if (progress.settings.strict) {
      showToast('Strict mode is on — backspace is disabled.');
      el.typingCard.classList.remove('shake');
      void el.typingCard.offsetWidth;
      el.typingCard.classList.add('shake');
      return;
    }
    state.index -= 1;
    state.typed.length = state.index;
    state.combo = 0;
    paintTyping();
    updateRunMeta();
    updateStats();
    updateKeyboard();
    playKeySound(true);
  }

  function finishRun() {
    if (state.finished) return;
    if (document.visibilityState === 'visible') {
      state.elapsedMs += Math.max(0, performance.now() - state.lastTick);
    }
    state.lastTick = performance.now();
    state.finished = true;
    state.active = false;
    window.clearInterval(state.timerId);
    state.timerId = null;
    el.typingCard.classList.remove('is-running');
    el.typingCard.classList.add('is-finished');
    setRunStatus('Run complete', 'finished');
    hideFocusVeil();
    paintTyping();
    updateRunMeta();
    updateStats();
    updateKeyboard();

    const duration = Math.max(1, Math.round(state.elapsedMs / 1000));
    const wpm = currentWpm();
    const accuracy = currentAccuracy();
    const previousBest = progress.history.length
      ? Math.max(...progress.history.map((run) => Number(run.wpm) || 0))
      : 0;
    const newBest = wpm > previousBest;
    const day = localDateKey();

    const record = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      lessonId: state.isSmart ? 'smart-drill' : state.isRandom ? 'random-drill' : state.lesson.id,
      lessonTitle: state.lesson.title,
      track: state.lesson.track || state.track,
      mode: state.isSmart ? 'smart' : state.isRandom ? 'random' : 'lesson',
      wpm,
      accuracy,
      seconds: duration,
      misses: { ...state.misses },
      combo: state.bestCombo
    };

    progress.history.push(record);
    if (progress.history.length > MAX_HISTORY) progress.history = progress.history.slice(-MAX_HISTORY);
    progress.totalSeconds += duration;
    progress.dailySeconds[day] = (progress.dailySeconds[day] || 0) + duration;

    let stars = 1;
    const targetWpm = state.lesson.targetWpm || 30;
    const targetAccuracy = state.lesson.targetAccuracy || 95;
    if (wpm >= targetWpm && accuracy >= targetAccuracy) stars = 3;
    else if (wpm >= targetWpm * 0.85 && accuracy >= Math.max(90, targetAccuracy - 2)) stars = 2;

    record.stars = stars;

    if (!state.isSmart && !state.isRandom && state.lesson?.id) {
      const existing = progress.lessons[state.lesson.id] || {
        bestWpm: 0,
        bestAccuracy: 0,
        stars: 0,
        attempts: 0,
        lastAt: null
      };
      progress.lessons[state.lesson.id] = {
        bestWpm: Math.max(existing.bestWpm || 0, wpm),
        bestAccuracy: Math.max(existing.bestAccuracy || 0, accuracy),
        stars: Math.max(existing.stars || 0, stars),
        attempts: (existing.attempts || 0) + 1,
        lastAt: record.date
      };
      progress.lastLesson = state.lesson.id;
      progress.lastLessons[state.lesson.track] = state.lesson.id;
    }

    saveProgress();
    renderPath();
    updateStreakUI();
    updateCoachAfterRun({ wpm, accuracy, stars, newBest });
    renderCoachWeakBlock();

    const runSummary = {
      wpm,
      accuracy,
      seconds: duration,
      stars,
      newBest,
      record,
      isSmart: state.isSmart,
      isRandom: state.isRandom,
      lesson: state.lesson,
      misses: { ...state.misses },
      bestCombo: state.bestCombo
    };
    state.lastRun = runSummary;
    state.summaryData = runSummary;

    playSuccessSound();
    window.clearTimeout(state.summaryTimer);
    state.summaryTimer = window.setTimeout(() => showSummary(runSummary), 240);
  }

  /* =========================================================
     Lesson selection / lesson UI
     ========================================================= */

  function pickDrill(lesson) {
    const pool = lesson.drills.length > 1
      ? lesson.drills.filter((drill) => drill !== state.lastDrillText)
      : lesson.drills;
    const chosen = (pool.length ? pool : lesson.drills)[Math.floor(Math.random() * (pool.length || lesson.drills.length))];
    state.lastDrillText = chosen;
    return chosen;
  }

  function setLessonHeading({ unit, number, title, desc, focus }) {
    el.lessonUnit.textContent = unit;
    el.lessonNumber.textContent = number;
    el.lessonTitle.textContent = title;
    el.lessonDesc.textContent = desc;
    el.focusChips.innerHTML = focus
      .map((item) => `<span class="focus-chip${String(item).length > 1 ? ' is-word' : ''}">${escapeHtml(item)}</span>`)
      .join('');
  }

  function renderCoachDefault() {
    el.coachText.textContent = state.lesson.coach;
  }

  function openLesson(id, options = {}) {
    const lesson = LESSON_BY_ID.get(id);
    if (!lesson) return;
    closeDialogIfOpen(el.summaryDialog);
    closeDialogIfOpen(el.resetDialog);
    closeDialogIfOpen(el.commandDialog);
    closeCourseMap();
    window.clearTimeout(state.summaryTimer);
    state.isSmart = false;
    state.isRandom = false;
    state.track = lesson.track;
    updateTrackUI();
    state.lesson = lesson;
    state.focusDisplay = lesson.focus;
    state.target = options.target || pickDrill(lesson);
    state.lastRun = null;

    resetEngine();
    renderTarget();
    resetStatsUI();
    updateRunMeta();
    renderPath();
    el.codeTag.hidden = !lesson.isCode;
    setLessonHeading({
      unit: lesson.track === 'general'
        ? `Unit ${lesson.unitNumber} · ${lesson.unitTitle}`
        : `${TRACKS[lesson.track].label} · Unit ${lesson.unitNumber} · ${lesson.unitTitle}`,
      number: `Lesson ${String(lesson.number).padStart(2, '0')}`,
      title: lesson.title,
      desc: lesson.desc,
      focus: lesson.focus
    });
    el.wpmTarget.textContent = `Target · ${lesson.targetWpm} WPM`;
    el.lessonTip.textContent = lesson.tip;
    renderCoachDefault();
    renderCoachWeakBlock();
    state.lastDrillText = state.target;
    progress.lastLesson = id;
    progress.lastLessons[lesson.track] = id;
    saveProgress();
    switchView('practice');
    el.nextKeyLabel.textContent = '—';
    updateKeyboard();
    updateStats();
    requestAnimationFrame(focusPad);
  }

  function buildRandomText() {
    const pool = shuffle(RANDOM_SENTENCES);
    const chosen = [];
    let length = 0;
    for (const sentence of pool) {
      if (chosen.length >= 4) break;
      if (chosen.length && length + sentence.length > 235) continue;
      chosen.push(sentence);
      length += sentence.length + 1;
      if (chosen.length >= 2 && length >= 145) break;
    }
    return chosen.length ? chosen.join(' ') : PUNCTUATION_FALLBACK;
  }

  function openRandomDrill() {
    let target = buildRandomText();
    if (target === state.lastRandomText) target = buildRandomText();
    state.lastRandomText = target;

    const randomLesson = {
      id: 'random-drill',
      track: 'random',
      isCode: false,
      title: 'Random text',
      desc: 'A fresh paragraph assembled from the prose you have practiced.',
      tip: 'Read in phrases. The sentences are new, but the shapes are familiar.',
      coach: 'Random text is a test of reading, not memory. Look one phrase ahead and keep the home row quiet.',
      targetWpm: 40,
      targetAccuracy: 96,
      focus: ['Random', 'Prose'],
      unitNumber: 'Free',
      unitTitle: 'Fresh text',
      number: 0
    };

    closeDialogIfOpen(el.summaryDialog);
    closeDialogIfOpen(el.resetDialog);
    closeDialogIfOpen(el.commandDialog);
    closeCourseMap();
    window.clearTimeout(state.summaryTimer);
    state.isSmart = false;
    state.isRandom = true;
    updateTrackUI();
    state.lesson = randomLesson;
    state.focusDisplay = randomLesson.focus;
    state.target = target;
    state.lastRun = null;

    resetEngine();
    renderTarget();
    resetStatsUI();
    updateRunMeta();
    renderPath();
    el.codeTag.hidden = true;
    setLessonHeading({
      unit: 'Random · Fresh text',
      number: 'Free practice',
      title: 'Random text',
      desc: randomLesson.desc,
      focus: randomLesson.focus
    });
    el.wpmTarget.textContent = `Target · ${randomLesson.targetWpm} WPM`;
    el.lessonTip.textContent = randomLesson.tip;
    el.coachText.textContent = randomLesson.coach;
    renderCoachWeakBlock();
    state.lastDrillText = target;
    switchView('practice');
    el.nextKeyLabel.textContent = '—';
    updateKeyboard();
    updateStats();
    requestAnimationFrame(focusPad);
    showToast('Fresh random paragraph ready.');
  }

  function openSmartDrill() {
    const weak = weakKeys(4);
    if (!weak.length) {
      showToast('Finish a run first — then I can build a drill from your misses.');
      return;
    }

    const usableLetters = weak
      .map((item) => item.char.toLowerCase())
      .filter((char) => /^[a-z0-9]$/.test(char));
    const punctuation = weak.map((item) => item.char).filter((char) => !/^[a-z0-9]$/.test(char));
    const isCodeSmart = state.track !== 'general';
    let target = '';

    if (isCodeSmart) {
      target = buildCodeSmartDrill(weak.map((item) => item.char));
    } else {
      if (usableLetters.length) {
        target = buildSmartDrill(usableLetters);
      } else {
        target = PUNCTUATION_FALLBACK;
      }
      if (punctuation.length && target.length < 125) {
        target = `${target} ${PUNCTUATION_FALLBACK}`;
      }
      target = target.replace(/\s+/g, ' ').trim();
      if (target.length > 150) target = target.slice(0, 150).replace(/\s+\S*$/, '');
    }

    if (!target) target = PUNCTUATION_FALLBACK;

    const smartTrack = isCodeSmart ? state.track : 'general';
    const pseudoLesson = {
      id: 'smart-drill',
      track: smartTrack,
      isCode: isCodeSmart,
      title: isCodeSmart ? 'Code weak-key repair' : 'Weak-key repair',
      desc: isCodeSmart
        ? 'A generated coding round built around the punctuation and keys you miss most.'
        : 'A generated round built around the keys your hands hesitate on.',
      tip: isCodeSmart
        ? 'Code rewards precision. Take the symbols one at a time and reset on the home row between lines.'
        : 'Go slowly enough to hit every key intentionally. The point is to overwrite the old pattern.',
      coach: 'This drill is built from your recent misses. Keep it slow and deliberate; clean repetitions are what stick.',
      targetWpm: isCodeSmart ? 22 : 35,
      targetAccuracy: 96,
      focus: weak.map((item) => displayChar(item.char)),
      unitNumber: 'Adaptive',
      unitTitle: isCodeSmart ? TRACKS[smartTrack].label : 'Adaptive',
      number: 0
    };

    closeDialogIfOpen(el.summaryDialog);
    closeDialogIfOpen(el.resetDialog);
    closeCourseMap();
    window.clearTimeout(state.summaryTimer);
    state.track = pseudoLesson.track;
    state.isSmart = true;
    state.isRandom = false;
    updateTrackUI();
    state.lesson = pseudoLesson;
    state.focusDisplay = pseudoLesson.focus;
    state.target = target;
    state.lastRun = null;

    resetEngine();
    renderTarget();
    resetStatsUI();
    updateRunMeta();
    renderPath();
    el.codeTag.hidden = !isCodeSmart;
    setLessonHeading({
      unit: isCodeSmart ? `${TRACKS[smartTrack].label} · Adaptive` : 'Adaptive · Coaching',
      number: 'Custom drill',
      title: pseudoLesson.title,
      desc: pseudoLesson.desc,
      focus: pseudoLesson.focus
    });
    el.wpmTarget.textContent = `Target · ${pseudoLesson.targetWpm} WPM`;
    el.lessonTip.textContent = pseudoLesson.tip;
    el.coachText.textContent = pseudoLesson.coach;
    renderCoachWeakBlock();
    state.lastDrillText = target;
    switchView('practice');
    el.nextKeyLabel.textContent = '—';
    updateKeyboard();
    updateStats();
    requestAnimationFrame(focusPad);
    showToast(isCodeSmart
      ? 'Code repair drill built from your stickiest symbols.'
      : 'Smart drill built from your stickiest keys.');
  }

  function buildSmartDrill(keys) {
    const normalized = [...new Set(keys.map((key) => key.toLowerCase()))].filter((key) => /^[a-z0-9]$/.test(key));
    if (!normalized.length) return PUNCTUATION_FALLBACK;
    const pool = WORD_BANK.filter((word) => normalized.some((key) => word.includes(key)));
    if (!pool.length) return PUNCTUATION_FALLBACK;

    const picked = [];
    const used = new Set();
    const shuffledPool = shuffle(pool);

    normalized.forEach((key) => {
      const match = shuffledPool.find((word) => word.includes(key) && !used.has(word));
      if (match) {
        picked.push(match);
        used.add(match);
      }
    });

    const randomPool = shuffle(pool);
    let safety = 0;
    while (picked.join(' ').length < 88 && safety < 80) {
      const word = randomPool[safety % randomPool.length];
      if (!used.has(word)) {
        picked.push(word);
        used.add(word);
      }
      safety += 1;
    }

    if (picked.length < 3) return PUNCTUATION_FALLBACK;
    return picked.join(' ');
  }

  function resetStatsUI() {
    el.wpm.textContent = '0';
    el.accuracy.innerHTML = '100<span>%</span>';
    el.timer.textContent = '0:00';
    el.combo.textContent = '0';
    el.goalValue.textContent = '0%';
    el.goalFill.style.width = '0%';
    el.goalFill.style.background = 'var(--red)';
    el.cardProgress.style.width = '0%';
  }

  function restartCurrent(newDrill = false) {
    if (!state.lesson) return;
    if (state.isSmart) {
      openSmartDrill();
      return;
    }
    const lesson = state.lesson;
    closeDialogIfOpen(el.summaryDialog);
    resetEngine();
    state.target = newDrill ? pickDrill(lesson) : state.target;
    state.lastDrillText = state.target;
    state.lastRun = null;
    renderTarget();
    resetStatsUI();
    updateRunMeta();
    updateKeyboard();
    renderCoachDefault();
    renderCoachWeakBlock();
    setRunStatus('Ready when you are');
    focusPad();
  }

  function updateCoachAfterRun({ wpm, accuracy }) {
    const target = state.lesson?.targetWpm || 30;
    const targetAccuracy = state.lesson?.targetAccuracy || 95;
    let message;
    if (accuracy < 90) {
      message = 'Accuracy first. Slow the roll by about ten percent and let every key land before moving on.';
    } else if (accuracy < targetAccuracy) {
      message = 'The pace is there; the clean edge is not yet. Aim for one perfect line rather than a faster one.';
    } else if (wpm < target * 0.8) {
      message = 'Your keys are clean. Close the gap with a steadier rhythm, not a faster burst.';
    } else if (wpm >= target) {
      message = 'Speed and accuracy are meeting. Lock this in with one more calm, clean pass.';
    } else {
      message = 'Good control. Read one word ahead and let the pace rise on its own.';
    }
    el.coachText.textContent = message;
  }

  function renderCoachWeakBlock() {
    const weak = weakKeys(3);
    if (!weak.length) {
      el.weakBlock.hidden = true;
      el.smartDrillBtn.hidden = true;
      return;
    }
    el.weakBlock.hidden = false;
    el.weakKeys.innerHTML = weak
      .map((item) => `<span class="key-chip">${escapeHtml(displayChar(item.char))}<small>${item.count}</small></span>`)
      .join('');
    el.smartDrillBtn.hidden = false;
  }

  /* =========================================================
     Summary dialog
     ========================================================= */

  function showSummary(run) {
    if (!run || state.view !== 'practice') return;
    if (el.summaryDialog.open) el.summaryDialog.close();
    const accuracy = run.accuracy;
    const wpm = run.wpm;
    const isSmart = run.isSmart;
    const isRandom = Boolean(run.isRandom);
    const isCode = Boolean(run.lesson?.isCode);
    const trackId = run.lesson?.track || 'general';
    const label = trackName(trackId);
    const nextLesson = !isSmart && !isRandom ? nextLessonInTrack(run.lesson) : null;

    el.summaryEyebrow.textContent = isRandom
      ? 'Random round complete'
      : isSmart
        ? (isCode ? 'Code repair complete' : 'Repair round complete')
        : (trackId === 'general' ? 'Lesson complete' : `${label} lesson complete`);
    el.summaryStars.innerHTML = [0, 1, 2]
      .map((index) => `<span class="${index < run.stars ? '' : 'off'}">★</span>`)
      .join(' ');
    el.summaryStars.setAttribute('aria-label', `${run.stars} out of 3 stars`);

    if (run.stars === 3) {
      el.summaryHeadline.textContent = isSmart ? 'Clean repair.' : 'That was clean.';
      el.summaryNote.textContent = 'Your speed and accuracy are moving together. That is the whole game.';
    } else if (run.stars === 2) {
      el.summaryHeadline.textContent = 'Good run.';
      el.summaryNote.textContent = 'A strong pass. The next star is hiding in your accuracy.';
    } else {
      el.summaryHeadline.textContent = accuracy < 90 ? 'Slow is smooth.' : 'The reps count.';
      el.summaryNote.textContent = accuracy < 90
        ? 'The line is finished. Now slow down enough to make the next one cleaner.'
        : 'You finished the line. Now let the next pass be a little more precise.';
    }

    el.summaryPb.hidden = !run.newBest;
    el.summaryWpm.textContent = String(wpm);
    el.summaryAccuracy.textContent = `${accuracy}%`;
    el.summaryTime.textContent = formatClock(run.seconds);
    el.summaryCoach.textContent = buildSummaryCoach(run);

    const misses = Object.entries(run.misses || {})
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
    if (misses.length) {
      el.summaryWeak.hidden = false;
      el.summaryWeakKeys.innerHTML = misses
        .map(([char, count]) => `<span class="key-chip">${escapeHtml(displayChar(char))}<small>${count}</small></span>`)
        .join('');
    } else {
      el.summaryWeak.hidden = true;
    }

    if (isRandom) {
      el.nextLessonBtn.innerHTML = 'Another random drill <span aria-hidden="true">→</span>';
      state.pendingNext = 'random';
    } else if (isSmart) {
      el.nextLessonBtn.innerHTML = 'New repair drill <span aria-hidden="true">→</span>';
      state.pendingNext = 'smart';
    } else if (nextLesson) {
      const nextLabel = trackId === 'languages' ? 'Next language lesson' : isCode ? 'Next code lesson' : 'Next lesson';
      el.nextLessonBtn.innerHTML = `${nextLabel} <span aria-hidden="true">→</span>`;
      state.pendingNext = nextLesson.id;
    } else {
      el.nextLessonBtn.innerHTML = 'View your progress <span aria-hidden="true">→</span>';
      state.pendingNext = 'progress';
    }

    if (typeof el.summaryDialog.showModal === 'function') {
      el.summaryDialog.showModal();
      setTimeout(() => el.nextLessonBtn.focus(), 30);
    }
  }

  function buildSummaryCoach(run) {
    const targetAccuracy = run.lesson?.targetAccuracy || 95;
    const targetWpm = run.lesson?.targetWpm || 30;
    if (run.accuracy < 90) {
      return 'Leave the accelerator alone for a run. Read each line, strike each key, and let the timer be irrelevant.';
    }
    if (run.accuracy < targetAccuracy) {
      return 'You have the speed. The win now is a cleaner line: same rhythm, fewer corrections.';
    }
    if (run.wpm >= targetWpm) {
      return 'Your hands are ahead of the clock. Keep this exact rhythm and give it one more clean pass.';
    }
    return 'Accuracy is holding. Now close the gap with a relaxed, even pace rather than a burst.';
  }

  function closeDialogIfOpen(dialog) {
    if (dialog && dialog.open) dialog.close();
  }

  /* =========================================================
     Progress view
     ========================================================= */

  function renderProgress() {
    const history = progress.history;
    const completed = lessonsCompleted();
    const streak = currentStreak();
    el.metricLessonsTotal.textContent = String(ALL_LESSONS.length);
    const bestRun = history.reduce((best, run) => (Number(run.wpm) > Number(best?.wpm || 0) ? run : best), null);
    const averageAccuracy = history.length
      ? Math.round(history.reduce((sum, run) => sum + Number(run.accuracy || 0), 0) / history.length)
      : 0;

    el.metricBestWpm.textContent = bestRun ? String(Math.round(bestRun.wpm)) : '0';
    el.metricBestFoot.textContent = bestRun ? `Set on “${bestRun.lessonTitle}”` : 'Finish a run to set a mark';
    el.metricAccuracy.textContent = history.length ? String(averageAccuracy) : '—';
    el.metricAccuracyFoot.textContent = history.length
      ? `${plural(history.length, 'run')} averaged`
      : 'Precision before pace';
    el.metricTime.textContent = formatPracticeMinutes(progress.totalSeconds);
    el.metricLessons.textContent = String(completed);
    el.metricStreakFoot.textContent = streak > 0 ? `${plural(streak, 'day')} in a row` : 'No streak yet';

    renderSpeedChart(history);
    renderWeakList();
    renderCalendar();
    renderRecords();
    renderSessions();
    el.clearHistoryBtn.hidden = history.length === 0;
  }

  function formatPracticeMinutes(seconds) {
    if (!seconds) return '0';
    const minutes = seconds / 60;
    if (minutes < 10) return minutes.toFixed(1);
    return String(Math.round(minutes));
  }

  function renderSpeedChart(history) {
    const runs = history.slice(-12);
    if (!runs.length) {
      el.speedChart.innerHTML = `
        <div class="chart-empty">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5M4 19h17"/><path d="M7 15l4-5 3 3 5-7"/></svg>
          <strong>Your first line is waiting.</strong>
          <span>Complete a run and your pace will appear here.</span>
        </div>`;
      el.speedChart.setAttribute('aria-label', 'No speed history yet.');
      return;
    }

    const width = 720;
    const height = 236;
    const pad = { top: 22, right: 20, bottom: 30, left: 38 };
    const plotWidth = width - pad.left - pad.right;
    const plotHeight = height - pad.top - pad.bottom;
    const values = runs.map((run) => Math.max(0, Number(run.wpm) || 0));
    const maxValue = Math.max(40, Math.ceil((Math.max(...values) * 1.18) / 10) * 10);
    const minValue = 0;
    const xFor = (index) => {
      if (runs.length === 1) return pad.left + plotWidth / 2;
      return pad.left + (index / (runs.length - 1)) * plotWidth;
    };
    const yFor = (value) => pad.top + plotHeight - ((value - minValue) / (maxValue - minValue)) * plotHeight;

    const points = runs.map((run, index) => ({
      x: xFor(index),
      y: yFor(values[index]),
      run,
      value: values[index]
    }));

    let linePath = '';
    if (points.length === 1) {
      linePath = `M ${points[0].x} ${points[0].y}`;
    } else {
      linePath = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i += 1) {
        const previous = points[i - 1];
        const point = points[i];
        const midX = (previous.x + point.x) / 2;
        linePath += ` C ${midX} ${previous.y}, ${midX} ${point.y}, ${point.x} ${point.y}`;
      }
    }
    const areaPath = points.length > 1
      ? `${linePath} L ${points[points.length - 1].x} ${pad.top + plotHeight} L ${points[0].x} ${pad.top + plotHeight} Z`
      : '';

    const gridLines = [0, 0.25, 0.5, 0.75, 1].map((fraction) => {
      const value = Math.round(maxValue - (maxValue - minValue) * fraction);
      const y = pad.top + plotHeight * fraction;
      return `
        <line class="chart-grid-line" x1="${pad.left}" x2="${width - pad.right}" y1="${y}" y2="${y}"></line>
        <text class="chart-axis-label" x="${pad.left - 9}" y="${y + 3}" text-anchor="end">${value}</text>`;
    }).join('');

    const dots = points.map((point) => `
      <circle class="chart-dot" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="3.5">
        <title>${escapeHtml(shortDate(point.run.date))} · ${point.value} WPM · ${escapeHtml(String(point.run.accuracy))}% accuracy</title>
      </circle>`).join('');

    const xLabels = runs.length === 1
      ? `<text class="chart-axis-label" x="${points[0].x}" y="${height - 7}" text-anchor="middle">${escapeHtml(shortDate(runs[0].date))}</text>`
      : `<text class="chart-axis-label" x="${points[0].x}" y="${height - 7}" text-anchor="start">${escapeHtml(shortDate(runs[0].date))}</text>
         <text class="chart-axis-label" x="${points[points.length - 1].x}" y="${height - 7}" text-anchor="end">${escapeHtml(shortDate(runs[runs.length - 1].date))}</text>`;

    const last = points[points.length - 1];
    const lastLabelX = Math.min(width - pad.right - 30, Math.max(pad.left + 12, last.x));
    const lastLabel = `<text class="chart-axis-label" x="${lastLabelX}" y="${Math.max(13, last.y - 12)}" text-anchor="middle" style="fill: var(--red)">${last.value} WPM</text>`;
    const singleRunLine = points.length === 1
      ? `<line class="chart-single-line" x1="${pad.left}" x2="${width - pad.right}" y1="${last.y}" y2="${last.y}"></line>`
      : '';

    el.speedChart.innerHTML = `
      <svg class="speed-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart of words per minute over your last ${runs.length} runs. Latest run: ${last.value} words per minute.">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2947c8" stop-opacity="0.2"></stop>
            <stop offset="100%" stop-color="#2947c8" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        ${gridLines}
        ${singleRunLine}
        ${areaPath ? `<path class="chart-area" d="${areaPath}"></path>` : ''}
        ${points.length > 1 ? `<path class="chart-line" d="${linePath}"></path>` : ''}
        ${dots}
        ${lastLabel}
        ${xLabels}
      </svg>`;
  }

  function renderWeakList() {
    const weak = weakKeys(6);
    if (!weak.length) {
      el.weakKeyList.innerHTML = `
        <div class="list-empty" style="height:150px">
          <strong>No sticky keys yet.</strong>
          <span>Finish a run and your misses will be mapped here.</span>
        </div>`;
      el.weakDrillBtn.hidden = true;
      return;
    }
    const max = Math.max(...weak.map((item) => item.count));
    el.weakKeyList.innerHTML = weak.map((item) => `
      <div class="weak-row" title="${escapeHtml(displayChar(item.char))} missed ${item.count} ${item.count === 1 ? 'time' : 'times'}">
        <span class="weak-glyph">${escapeHtml(item.char === ' ' ? '␣' : displayKey(item.char))}</span>
        <span class="weak-bar"><span style="width:${Math.max(10, Math.round((item.count / max) * 100))}%"></span></span>
        <span class="weak-count">${item.count}×</span>
      </div>`).join('');
    el.weakDrillBtn.hidden = false;
  }

  function renderCalendar() {
    const days = [];
    const today = new Date();
    for (let offset = 27; offset >= 0; offset -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      const key = localDateKey(date);
      const seconds = Number(progress.dailySeconds[key] || 0);
      let level = 0;
      if (seconds > 0) level = 1;
      if (seconds >= 60) level = 2;
      if (seconds >= 180) level = 3;
      if (seconds >= 300) level = 4;
      days.push({ date, key, seconds, level, isToday: key === localDateKey(today) });
    }
    const activeDays = days.filter((day) => day.seconds > 0).length;
    el.calendarMeta.textContent = activeDays ? `${activeDays} active ${activeDays === 1 ? 'day' : 'days'}` : 'No activity yet';
    el.activityCalendar.innerHTML = days.map((day) => {
      const minutes = day.seconds ? `${(day.seconds / 60).toFixed(1)} min` : 'No practice';
      return `<div class="cal-cell${day.isToday ? ' is-today' : ''}" data-level="${day.level}" title="${escapeHtml(shortDate(day.date))} · ${minutes}"></div>`;
    }).join('');
    el.activityCalendar.setAttribute('aria-label', `Practice activity over the last 28 days. ${activeDays} active days.`);
  }

  function renderRecords() {
    const records = ALL_LESSONS
      .map((lesson) => ({ lesson, record: progress.lessons[lesson.id] }))
      .filter(({ record }) => record && record.bestWpm > 0)
      .sort((a, b) => b.record.bestWpm - a.record.bestWpm)
      .slice(0, 5);

    if (!records.length) {
      el.recordsMeta.textContent = 'No records yet';
      el.recordList.innerHTML = `
        <div class="list-empty" style="height:150px">
          <strong>No records yet.</strong>
          <span>Finish a lesson to set your first benchmark.</span>
        </div>`;
      return;
    }

    el.recordsMeta.textContent = `Top ${records.length} · ${lessonsCompleted()} complete`;
    el.recordList.innerHTML = records.map(({ lesson, record }, index) => `
      <div class="record-row">
        <span class="record-rank">${String(index + 1).padStart(2, '0')}</span>
        <div class="record-copy">
          <strong>${escapeHtml(lesson.title)}</strong>
          <small>${trackName(lesson.track)} · Unit ${lesson.unitNumber} · ${record.bestAccuracy}% best accuracy</small>
        </div>
        <span class="record-score">${record.bestWpm}<small>WPM</small></span>
      </div>`).join('');
  }

  function renderSessions() {
    const runs = progress.history.slice(-6).reverse();
    if (!runs.length) {
      el.sessionList.innerHTML = `
        <div class="list-empty">
          <strong>No runs logged yet.</strong>
          <span>Your completed lessons will collect here.</span>
        </div>`;
      return;
    }
    el.sessionList.innerHTML = runs.map((run) => {
      const starCount = Math.max(1, Math.min(3, Number(run.stars) || Math.round(run.accuracy >= 97 ? 3 : run.accuracy >= 94 ? 2 : 1)));
      const stars = '★'.repeat(starCount);
      const modeLabel = run.mode === 'smart'
        ? 'Adaptive drill'
        : run.mode === 'random'
          ? 'Random drill'
          : `${trackName(run.track)} lesson`;
      return `
        <div class="session-row">
          <div class="session-name">${escapeHtml(run.lessonTitle)}<small>${escapeHtml(sessionDateLabel(run.date))} · ${modeLabel}</small></div>
          <div class="session-number">${Math.round(Number(run.wpm) || 0)} <small>WPM</small></div>
          <div class="session-number session-accuracy">${Math.round(Number(run.accuracy) || 0)}<small>%</small></div>
          <div class="session-badge" aria-label="${stars.length} stars">${stars}</div>
        </div>`;
    }).join('');
  }

  /* =========================================================
     Sound
     ========================================================= */

  function ensureAudio() {
    if (!progress.settings.sound) return null;
    try {
      if (!state.audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return null;
        state.audioContext = new AudioContext();
      }
      if (state.audioContext.state === 'suspended') state.audioContext.resume();
      return state.audioContext;
    } catch (error) {
      return null;
    }
  }

  function playKeySound(correct) {
    if (!progress.settings.sound) return;
    const context = ensureAudio();
    if (!context) return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = correct ? 'triangle' : 'sawtooth';
    oscillator.frequency.setValueAtTime(correct ? 600 : 145, now);
    oscillator.frequency.exponentialRampToValueAtTime(correct ? 480 : 105, now + 0.035);
    gain.gain.setValueAtTime(Math.max(0.0001, 0.026), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.06);
  }

  function playSuccessSound() {
    if (!progress.settings.sound) return;
    const context = ensureAudio();
    if (!context) return;
    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const start = context.currentTime + index * 0.095;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.032, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.32);
    });
  }

  /* =========================================================
     Keyboard-first command palette
     ========================================================= */

  function isMacPlatform() {
    return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '');
  }

  function setPlatformShortcutLabel() {
    el.commandShortcut.textContent = isMacPlatform() ? '⌘ K' : 'Ctrl K';
    el.commandTrigger.title = `Command palette (${isMacPlatform() ? '⌘' : 'Ctrl'} K)`;
  }

  function toggleSound() {
    progress.settings.sound = !progress.settings.sound;
    saveProgress();
    updateToggleUI();
    if (progress.settings.sound) {
      ensureAudio();
      playSuccessSound();
      showToast('Key sounds on.');
    } else {
      showToast('Key sounds off.');
    }
    focusPad();
  }

  function toggleStrict() {
    progress.settings.strict = !progress.settings.strict;
    saveProgress();
    updateToggleUI();
    showToast(progress.settings.strict ? 'Strict mode on. Backspace is disabled.' : 'Strict mode off.');
    if (state.active && !state.finished) {
      setRunStatus(progress.settings.strict ? 'Strict run · in flow' : 'In flow');
    }
    focusPad();
  }

  function goToNextLesson() {
    if (!state.lesson) return;
    if (state.isRandom) {
      openRandomDrill();
      return;
    }
    if (state.isSmart) {
      openSmartDrill();
      return;
    }
    const next = nextLessonInTrack(state.lesson);
    if (next) {
      openLesson(next.id);
      return;
    }
    showToast(`That is the last ${TRACKS[state.track]?.label.toLowerCase() || 'practice'} lesson. Open Progress to review.`);
  }

  function getCommandItems() {
    const items = [
      {
        id: 'view-practice',
        label: 'Go to practice',
        meta: 'Return to the typing desk',
        icon: '⌨',
        shortcut: 'Alt 1',
        search: 'practice type keyboard lesson',
        run: () => switchView('practice')
      },
      {
        id: 'view-progress',
        label: 'Open progress',
        meta: 'Pace history, weak keys and records',
        icon: '↗',
        shortcut: 'Alt 2',
        search: 'progress stats chart weak keys streak',
        run: () => switchView('progress')
      },
      {
        id: 'view-guide',
        label: 'Open field guide',
        meta: 'Posture, finger map and practice routine',
        icon: '▤',
        shortcut: 'Alt 3',
        search: 'guide help posture fingers routine',
        run: () => switchView('guide')
      },
      {
        id: 'privacy',
        label: 'Privacy & storage',
        meta: 'Review cookies, consent and saved progress',
        icon: '§',
        search: 'privacy cookies consent storage local data delete',
        run: openConsentDialog
      },
      {
        id: 'restart',
        label: 'New run',
        meta: 'Restart the current lesson with a fresh line',
        icon: '↻',
        shortcut: 'Alt R',
        search: 'restart new run reset drill',
        run: () => restartCurrent(true)
      },
      {
        id: 'random-text',
        label: 'Random text drill',
        meta: 'A fresh paragraph generated for this run',
        icon: '⟳',
        shortcut: 'Alt G',
        search: 'random shuffle surprise generate text free practice',
        run: () => openRandomDrill()
      },
      {
        id: 'next-lesson',
        label: 'Next lesson',
        meta: 'Move forward in the current track',
        icon: '→',
        shortcut: 'Alt N',
        search: 'next continue lesson',
        run: goToNextLesson
      },
      {
        id: 'course-map',
        label: 'Open lesson map',
        meta: 'Browse all three tracks and every lesson',
        icon: '▦',
        shortcut: 'Alt L',
        search: 'map curriculum lessons course browse',
        run: openCourseMap
      },
      {
        id: 'reveal-one',
        label: 'Reveal only the current letter',
        meta: 'The strictest reveal mode',
        icon: '·',
        search: 'reveal hidden letters blind focus one letter',
        run: () => setRevealMode('one')
      },
      {
        id: 'reveal-letters',
        label: `Reveal the next ${REVEAL_LOOKAHEAD} letters`,
        meta: 'See a little ahead while the rest stays hidden',
        icon: '›',
        search: 'reveal preview lookahead next letters',
        run: () => setRevealMode('letters')
      },
      {
        id: 'reveal-line',
        label: 'Reveal the full line',
        meta: 'Show the whole drill while you type',
        icon: '≡',
        search: 'reveal full line visible text',
        run: () => setRevealMode('line')
      },
      {
        id: 'switch-code',
        label: 'Open Code lab',
        meta: 'Syntax, symbols, JavaScript, Python and the terminal',
        icon: '</>',
        search: 'code coding programming track syntax',
        run: () => switchTrack('code')
      },
      {
        id: 'switch-languages',
        label: 'Open Language lab',
        meta: 'Go, Rust, C/C++, Java, Kotlin, C#, Swift, Ruby, PHP, Lua and R',
        icon: 'L',
        search: 'languages language programming go rust c c++ java kotlin csharp swift ruby php lua r',
        run: () => switchTrack('languages')
      },
      {
        id: 'switch-general',
        label: 'Open Everyday track',
        meta: 'Home row, words, punctuation and flow',
        icon: 'AB',
        search: 'everyday daily general typing track',
        run: () => switchTrack('general')
      },
      {
        id: 'toggle-sound',
        label: progress.settings.sound ? 'Turn key sounds off' : 'Turn key sounds on',
        meta: 'Audible feedback for every keystroke',
        icon: '♪',
        shortcut: 'Alt S',
        search: 'sound audio click mute',
        run: toggleSound
      },
      {
        id: 'toggle-strict',
        label: progress.settings.strict ? 'Turn strict mode off' : 'Turn strict mode on',
        meta: 'Strict mode disables Backspace',
        icon: '⌫',
        shortcut: 'Alt X',
        search: 'strict backspace mistakes',
        run: toggleStrict
      }
    ];

    const trackOrder = [state.track, ...Object.keys(TRACKS).filter((track) => track !== state.track)];
    const orderedLessons = trackOrder.flatMap((track) => TRACKS[track].lessons);
    const lessonCommands = orderedLessons.map((lesson) => ({
      id: `lesson-${lesson.id}`,
      label: lesson.title,
      meta: `${TRACKS[lesson.track].label} · Unit ${lesson.unitNumber} · Lesson ${String(lesson.number).padStart(2, '0')}`,
      icon: lesson.track === 'general' ? 'AB' : lesson.track === 'languages' ? 'L' : '</>',
      search: `${lesson.track} ${TRACKS[lesson.track].label} ${lesson.unitTitle} ${lesson.focus.join(' ')} ${lesson.isCode ? 'code coding programming' : 'everyday typing'}`,
      run: () => openLesson(lesson.id, { forceNewDrill: true })
    }));

    return [...items, ...lessonCommands];
  }

  function renderCommandResults(query) {
    const normalized = query.trim().toLowerCase();
    const ranked = state.commandItems
      .map((item, order) => {
        const label = item.label.toLowerCase();
        const meta = item.meta.toLowerCase();
        const search = (item.search || '').toLowerCase();
        const haystack = `${label} ${meta} ${search}`;
        if (normalized && !haystack.includes(normalized)) return null;
        let rank = 0;
        if (normalized) {
          if (label.startsWith(normalized)) rank = 0;
          else if (label.includes(normalized)) rank = 1;
          else if (meta.includes(normalized)) rank = 2;
          else rank = 3;
        }
        return { item, rank, order };
      })
      .filter(Boolean)
      .sort((a, b) => a.rank - b.rank || a.order - b.order);
    const filtered = ranked.map((entry) => entry.item);
    state.commandFiltered = filtered;
    if (state.commandIndex >= filtered.length) state.commandIndex = Math.max(0, filtered.length - 1);

    if (!filtered.length) {
      el.commandList.innerHTML = '<div class="command-empty">No lesson or command matches. Try “python”, “progress” or “new run”.</div>';
      el.commandInput.removeAttribute('aria-activedescendant');
      return;
    }

    el.commandList.innerHTML = filtered.map((item, index) => `
      <div class="command-item${index === state.commandIndex ? ' is-selected' : ''}"
        role="option" aria-selected="${index === state.commandIndex}"
        id="command-option-${index}" data-command-index="${index}" tabindex="-1">
        <span class="command-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
        <span class="command-copy">
          <strong>${escapeHtml(item.label)}</strong>
          <small>${escapeHtml(item.meta)}</small>
        </span>
        ${item.shortcut ? `<kbd>${escapeHtml(item.shortcut)}</kbd>` : '<span class="command-enter" aria-hidden="true">↵</span>'}
      </div>`).join('');

    const selected = el.commandList.querySelector('.command-item.is-selected');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
      el.commandInput.setAttribute('aria-activedescendant', selected.id);
    }
  }

  function openCommandPalette() {
    if (el.summaryDialog.open || el.resetDialog.open || el.courseDialog.open || el.consentDialog.open) return;
    if (el.commandDialog.open) return;
    state.commandItems = getCommandItems();
    state.commandFiltered = state.commandItems;
    state.commandIndex = 0;
    el.commandInput.value = '';
    el.commandInput.setAttribute('aria-expanded', 'true');
    renderCommandResults('');
    el.commandDialog.showModal();
    requestAnimationFrame(() => {
      el.commandInput.focus();
    });
  }

  function closeCommandPalette() {
    if (el.commandDialog.open) el.commandDialog.close();
  }

  function executeCommand(item) {
    if (!item) return;
    closeCommandPalette();
    item.run();
  }

  function handleGlobalShortcuts(event) {
    const modifier = event.ctrlKey || event.metaKey;
    if (modifier && !event.altKey && event.key.toLowerCase() === 'k') {
      if (el.summaryDialog.open || el.resetDialog.open || el.courseDialog.open || el.consentDialog.open) return;
      event.preventDefault();
      if (el.commandDialog.open) closeCommandPalette();
      else openCommandPalette();
      return;
    }

    if (el.commandDialog.open || el.summaryDialog.open || el.resetDialog.open || el.courseDialog.open || el.consentDialog.open) return;
    if (!event.altKey || event.ctrlKey || event.metaKey) return;

    const key = event.key.toLowerCase();
    if (key === '1' || key === '2' || key === '3') {
      event.preventDefault();
      switchView(key === '1' ? 'practice' : key === '2' ? 'progress' : 'guide');
      return;
    }
    if (key === 'r' && state.view === 'practice') {
      event.preventDefault();
      restartCurrent(true);
      return;
    }
    if (key === 'g') {
      event.preventDefault();
      openRandomDrill();
      return;
    }
    if (key === 'n') {
      event.preventDefault();
      goToNextLesson();
      return;
    }
    if (key === 't') {
      event.preventDefault();
      const trackOrder = Object.keys(TRACKS);
      const nextTrack = trackOrder[(trackOrder.indexOf(state.track) + 1) % trackOrder.length];
      switchTrack(nextTrack);
      return;
    }
    if (key === 's') {
      event.preventDefault();
      toggleSound();
      return;
    }
    if (key === 'l') {
      event.preventDefault();
      openCourseMap();
      return;
    }
    if (key === 'x') {
      event.preventDefault();
      toggleStrict();
    }
  }

  /* =========================================================
     Events
     ========================================================= */

  function bindEvents() {
    el.navLinks.forEach((link) => {
      link.addEventListener('click', () => switchView(link.dataset.view));
    });

    $$('[data-view-target]').forEach((button) => {
      button.addEventListener('click', () => switchView(button.dataset.viewTarget));
    });

    el.coursePath.addEventListener('click', (event) => {
      const button = event.target.closest('[data-lesson-id]');
      if (!button) return;
      closeCourseMap();
      openLesson(button.dataset.lessonId, { forceNewDrill: true });
    });

    $$('[data-open-course]').forEach((button) => {
      button.addEventListener('click', openCourseMap);
    });
    el.closeCourse.addEventListener('click', closeCourseMap);
    el.courseDialog.addEventListener('click', (event) => {
      if (event.target === el.courseDialog) closeCourseMap();
    });
    el.courseDialog.addEventListener('close', () => {
      state.lastTick = performance.now();
      if (state.view === 'practice') setTimeout(focusPad, 20);
    });

    el.trackTabs.forEach((tab) => {
      tab.addEventListener('click', () => switchTrack(tab.dataset.track));
    });

    el.revealBtns.forEach((button) => {
      button.addEventListener('click', () => setRevealMode(button.dataset.reveal));
    });

    el.commandTrigger.addEventListener('click', openCommandPalette);
    el.commandInput.addEventListener('input', () => {
      state.commandIndex = 0;
      renderCommandResults(el.commandInput.value);
    });
    el.commandInput.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const count = state.commandFiltered.length;
        if (!count) return;
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        state.commandIndex = (state.commandIndex + direction + count) % count;
        renderCommandResults(el.commandInput.value);
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        executeCommand(state.commandFiltered[state.commandIndex]);
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeCommandPalette();
      }
    });
    el.commandList.addEventListener('click', (event) => {
      const item = event.target.closest('[data-command-index]');
      if (!item) return;
      const index = Number(item.dataset.commandIndex);
      executeCommand(state.commandFiltered[index]);
    });
    el.commandDialog.addEventListener('click', (event) => {
      if (event.target === el.commandDialog) closeCommandPalette();
    });
    el.commandDialog.addEventListener('close', () => {
      el.commandInput.setAttribute('aria-expanded', 'false');
      state.lastTick = performance.now();
      if (state.view === 'practice') setTimeout(focusPad, 20);
    });

    el.soundBtn.addEventListener('click', toggleSound);
    el.strictBtn.addEventListener('click', toggleStrict);
    el.privacyBtn.addEventListener('click', openConsentDialog);
    el.consentAllow.addEventListener('click', () => setConsent(true));
    el.consentEssential.addEventListener('click', () => setConsent(false));
    el.closeConsent.addEventListener('click', () => el.consentDialog.close());
    el.consentDetailsBtn.addEventListener('click', () => {
      const open = el.consentDetails.hidden;
      el.consentDetails.hidden = !open;
      el.consentDetailsBtn.setAttribute('aria-expanded', String(open));
      el.consentDetailsBtn.textContent = open ? 'Hide details' : 'What is stored?';
    });
    el.consentDialog.addEventListener('click', (event) => {
      if (event.target === el.consentDialog) el.consentDialog.close();
    });
    el.consentDialog.addEventListener('close', () => {
      if (state.view === 'practice') setTimeout(focusPad, 20);
    });

    el.restartBtn.addEventListener('click', () => {
      if (state.active && !state.finished) showToast('New run loaded.');
      restartCurrent(true);
    });

    el.randomBtn.addEventListener('click', openRandomDrill);

    el.typingCard.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      focusPad();
    });

    el.focusVeil.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      focusPad();
    });

    el.typingInput.addEventListener('focus', hideFocusVeil);
    el.typingInput.addEventListener('blur', () => {
      setTimeout(maybeShowFocusVeil, 70);
    });
    el.typingInput.addEventListener('input', () => {
      const inserted = el.typingInput.value;
      el.typingInput.value = '';
      if (!inserted) return;
      [...inserted].forEach((char) => {
        if (char === '\n' && state.target[state.index] !== '\n') return;
        handleCharacter(char);
      });
    });

    document.addEventListener('keydown', handleGlobalShortcuts);
    document.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('visibilitychange', tickPauseClock);
    window.addEventListener('focus', tickPauseClock);
    window.addEventListener('blur', () => {
      tickPauseClock();
      if (state.active && !state.finished) setTimeout(maybeShowFocusVeil, 80);
    });

    el.smartDrillBtn.addEventListener('click', openSmartDrill);
    el.progressSmartBtn.addEventListener('click', openSmartDrill);
    el.weakDrillBtn.addEventListener('click', openSmartDrill);
    el.guideStartBtn.addEventListener('click', startFromGuide);
    el.guideCtaBtn.addEventListener('click', startFromGuide);

    el.summaryDialog.addEventListener('close', () => {
      window.clearTimeout(state.summaryTimer);
      if (state.view === 'practice') setTimeout(focusPad, 20);
    });
    el.summaryDialog.addEventListener('click', (event) => {
      if (event.target === el.summaryDialog) el.summaryDialog.close();
    });
    el.closeSummary.addEventListener('click', () => el.summaryDialog.close());
    el.summaryProgressBtn.addEventListener('click', () => {
      el.summaryDialog.close();
      switchView('progress');
    });
    el.retryBtn.addEventListener('click', () => {
      el.summaryDialog.close();
      restartCurrent(false);
    });
    el.nextLessonBtn.addEventListener('click', () => {
      const next = state.pendingNext;
      el.summaryDialog.close();
      if (next === 'smart') {
        openSmartDrill();
      } else if (next === 'random') {
        openRandomDrill();
      } else if (next === 'progress') {
        switchView('progress');
      } else if (next && LESSON_BY_ID.has(next)) {
        openLesson(next);
      }
    });

    el.clearHistoryBtn.addEventListener('click', () => {
      el.resetDialog.showModal();
    });
    el.cancelReset.addEventListener('click', () => el.resetDialog.close());
    el.resetDialog.addEventListener('click', (event) => {
      if (event.target === el.resetDialog) el.resetDialog.close();
    });
    el.resetDialog.addEventListener('close', () => {
      if (state.view === 'practice') setTimeout(focusPad, 20);
    });
    el.confirmReset.addEventListener('click', resetAllProgress);

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (el.summaryDialog.open || el.resetDialog.open || el.commandDialog.open || el.courseDialog.open || el.consentDialog.open) return;
      if (state.view === 'practice' && state.lesson) {
        event.preventDefault();
        restartCurrent(false);
      }
    });
  }

  function startFromGuide() {
    const lesson = firstIncompleteLesson(state.track);
    switchView('practice');
    openLesson(lesson.id, { forceNewDrill: true });
  }

  function resetAllProgress() {
    const previousView = state.view;
    progress = defaultProgress();
    saveProgress();
    updateToggleUI();
    updateRevealUI();
    updateStreakUI();
    renderPath();
    closeDialogIfOpen(el.resetDialog);
    state.isSmart = false;
    state.track = 'general';
    const lesson = GENERAL_LESSONS[0];
    openLesson(lesson.id);
    if (previousView === 'progress') switchView('progress');
    renderProgress();
    showToast('Progress cleared. A fresh start.');
  }

  function handleGlobalKeyDown(event) {
    if (el.summaryDialog.open || el.resetDialog.open || el.commandDialog.open || el.courseDialog.open || el.consentDialog.open) return;
    if (state.view !== 'practice') return;
    if (event.defaultPrevented) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.isComposing) return;

    const target = event.target;
    const tagName = target?.tagName;
    if (target !== el.typingInput && (tagName === 'BUTTON' || tagName === 'A' || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA')) {
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      handleBackspace();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (state.target[state.index] === '\n') handleCharacter('\n');
      return;
    }

    if (event.key === 'Tab') return;

    if (event.key.length === 1) {
      event.preventDefault();
      handleCharacter(event.key);
    }
  }

  /* =========================================================
     Boot
     ========================================================= */

  function boot() {
    state.keyEls = buildKeyboard(el.keyboard);
    buildKeyboard(el.guideKeyboard, { tinted: true });
    updateToggleUI();
    updateRevealUI();
    updateStreakUI();
    renderPath();
    renderCoachWeakBlock();
    bindEvents();
    setPlatformShortcutLabel();

    const storedLesson = progress.lastLesson && LESSON_BY_ID.get(progress.lastLesson);
    const initialTrack = storedLesson?.track || 'general';
    state.track = initialTrack;
    const initial = storedLesson || firstIncompleteLesson(initialTrack);
    openLesson(initial.id);

    if (!consent) {
      setTimeout(openConsentDialog, 80);
    } else if (!window.matchMedia('(pointer: coarse)').matches) {
      setTimeout(focusPad, 120);
    }
  }

  boot();
})();
