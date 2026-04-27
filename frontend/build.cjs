#!/usr/bin/env node
const { build } = require('vite')
build().then(() => console.log('BUILD DONE')).catch(e => { console.error(e); process.exit(1) })

