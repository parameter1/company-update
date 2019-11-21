#!/bin/bash
cd services/app
./node_modules/.bin/ember serve --proxy=http://localhost:9900
