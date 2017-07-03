import test from 'ava'
import React from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import render from 'react-test-renderer'
import Feedback from '../src/Feedback'
import TestUtils from 'react-dom/test-utils'
import mapObj from 'map-obj'

function sleep(ms = 1) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const link = 'https://douban.com/example'
const qtype = '104'
function Root() {
  return (
    <Feedback
      extra={{aa: 'bb'}}
      link={link}
      qtype={qtype}
    />
  )
}

function renderTree(element, options = {}) {
  const tree = render.create(element, {
    createNodeMock(element) {
      try {
        return document.createElement(element.type)
      } catch (e) {
        console.error(e, element)
      }
      return null
    },
    ...options,
  }).toJSON()
  console.log(require('util').inspect(tree, { depth: null }));
  return tree
}

test.before(async t => {
})

test('Root render', async t => {
  const tree = renderTree(<Root />)
  await t.snapshot(tree)
})
