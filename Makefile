build:
	node-gyp rebuild

test:
	npm test

.PHONY: build test