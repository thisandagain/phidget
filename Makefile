build:
	node-gyp rebuild

webkit:
	nw-gyp clean
	nw-gyp configure --target=0.8.4
	nw-gyp build

test:
	npm test

.PHONY: build test
