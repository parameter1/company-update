#!/bin/bash
cd services/app
./node_modules/.bin/ember serve --proxy=http://localhost:5550
