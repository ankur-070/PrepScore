export const QUIZ_QUESTIONS = [
  // DBMS
  {
    id: 'q1',
    subjectKey: 'dbms',
    question: 'Which normal form removes transitive dependency?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correctAnswer: '3NF',
  },
  {
    id: 'q2',
    subjectKey: 'dbms',
    question: 'Which SQL join returns all rows from both tables?',
    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
    correctAnswer: 'FULL OUTER JOIN',
  },
  // Operating Systems
  {
    id: 'q3',
    subjectKey: 'os',
    question: 'Which scheduling algorithm may cause starvation?',
    options: ['FCFS', 'Round Robin', 'SJF', 'FIFO'],
    correctAnswer: 'SJF',
  },
  {
    id: 'q4',
    subjectKey: 'os',
    question: 'Which memory is volatile?',
    options: ['HDD', 'SSD', 'RAM', 'ROM'],
    correctAnswer: 'RAM',
  },
  // Computer Networks
  {
    id: 'q5',
    subjectKey: 'cn',
    question: 'HTTPS operates at which layer?',
    options: ['Network', 'Transport', 'Session', 'Application'],
    correctAnswer: 'Application',
  },
  {
    id: 'q6',
    subjectKey: 'cn',
    question: 'Default port number of HTTPS?',
    options: ['80', '21', '25', '443'],
    correctAnswer: '443',
  },
  // OOP
  {
    id: 'q7',
    subjectKey: 'oop',
    question: 'Which OOP principle allows multiple forms?',
    options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'],
    correctAnswer: 'Polymorphism',
  },
  {
    id: 'q8',
    subjectKey: 'oop',
    question: 'Which keyword enables inheritance in Java?',
    options: ['implement', 'extends', 'inherit', 'super'],
    correctAnswer: 'extends',
  },
]

export function questionsBySubject(subjectKey) {
  return QUIZ_QUESTIONS.filter((q) => q.subjectKey === subjectKey)
}
