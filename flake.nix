{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    corepack.url = "github:SnO2WMaN/corepack-flake";
    devshell.url = "github:numtide/devshell";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          overlays = with inputs; [
            devshell.overlay
            corepack.overlays.default
          ];
        };
      in {
        devShells.default = pkgs.devshell.mkShell {
          packages = with pkgs; [
            alejandra
            treefmt
            nodejs-16_x
            (mkCorepack {
              nodejs = nodejs-16_x;
              pm = "pnpm";
            })
          ];
          devshell.startup.pnpm_install.text = "pnpm install";
          env = [
            {
              name = "PATH";
              prefix = "$PRJ_ROOT/node_modules/.bin";
            }
          ];
        };
      }
    );
}
