# Matrix Multiplication

Basic matrix multiplication for a 2×2 matrix with a 2×1 vector:

\[
\begin{pmatrix} 
a & b \\\\ 
c & d 
\end{pmatrix} 
\begin{pmatrix} 
x \\\\ 
y 
\end{pmatrix} = 
\begin{pmatrix} 
ax + by \\\\ 
cx + dy 
\end{pmatrix}
\]

## Properties

1. **Not Commutative**
   In general:
   \[
   AB \neq BA
   \]

2. **Distributive**
   $$
   A(B + C) = AB + AC
   $$

3. **Identity Matrix**
   \[
   \begin{pmatrix} 
   1 & 0 \\\\ 
   0 & 1 
   \end{pmatrix}
   \begin{pmatrix} 
   x \\\\ 
   y 
   \end{pmatrix} =
   \begin{pmatrix} 
   x \\\\ 
   y 
   \end{pmatrix}
   \]