import pythagorean from './pythagorean.md?raw';
import quadratic from './quadratic.md?raw';
import einstein from './einstein.md?raw';
import basel from './basel.md?raw';
import euler from './euler.md?raw';
import gaussian from './gaussian.md?raw';
import matrix from './matrix.md?raw';
import taylor from './taylor.md?raw';
import inline from './inline.md?raw';

export const MATH_EXAMPLES = [
  {
    title: 'Inline Math Notation',
    description: 'Using inline math with \\( \\) syntax within text',
    content: inline
  },
  {
    title: 'Pythagorean Theorem',
    description: 'The fundamental relationship between sides of a right triangle',
    content: pythagorean
  },
  {
    title: 'Quadratic Formula',
    description: 'Solutions for quadratic equations with detailed analysis',
    content: quadratic
  },
  {
    title: 'Einstein\'s Mass-Energy Equivalence',
    description: 'The famous E = mc² equation and its implications',
    content: einstein
  },
  {
    title: 'Basel Problem',
    description: 'A fascinating infinite series solved by Euler',
    content: basel
  },
  {
    title: 'Euler\'s Identity',
    description: 'The most beautiful equation in mathematics',
    content: euler
  },
  {
    title: 'Gaussian Integral',
    description: 'A fundamental integral in probability and physics',
    content: gaussian
  },
  {
    title: 'Matrix Multiplication',
    description: 'Core concepts of matrix operations',
    content: matrix
  },
  {
    title: 'Taylor Series',
    description: 'Power series representations of functions',
    content: taylor
  }
] as const;