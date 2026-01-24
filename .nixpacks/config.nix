{ pkgs }: {
  packages = [
    pkgs.nodejs_20
  ];

  build = ''
    npm install
    npm run build
  '';
}

