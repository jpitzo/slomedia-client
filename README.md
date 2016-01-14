# Slomedia Client Frontend

## Install

1. Install Node server
2. Install global npm packages
```
sudo npm install -g bower grunt-cli
```
3. Install compass
```
gem install compass
```
4. CD into directory and run
```
npm install && bower install
```

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Configuration

Currently assumes local slomedia-server running on port 3000 and local slomedia-sync server running on port 3001
