{ pkgs }: {
    deps = [
        pkgs.python39Full
        pkgs.pypy3
        pkgs.sudo
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-16_x

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}