import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://github.com/KevoHoff/nviz.git', // Update to point to your repository
  user: {
   name: 'Kevin Hoffman', // update to use your name
   email: 'kevohoffman@icloud.com' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);