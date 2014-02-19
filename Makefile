build:
	nw-gyp clean
	nw-gyp configure --target=0.9.1
	nw-gyp build

test:
	npm test

.PHONY: build test
