interface User {
  role: string;
  status: string;
}

function showButton(label: string): void {
  console.log(label);
}

export function maybeShowSubmit(user: User, loginAttempts: number): void {
  if (user.role === 'admin') {
    if (user.status === 'active') {
      if (loginAttempts < 5) {
        showButton('Submit');
      }
    }
  }
}
