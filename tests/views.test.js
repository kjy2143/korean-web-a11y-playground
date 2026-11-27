import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderDetail, renderList } from '../dashboard/views.js';

const demo = (id, extra = {}) => {
  const match = /^(.+)-(off|on)$/.exec(id);
  return {
    id,
    title: '가',
    description: '설명',
    date: id.slice(0, 10),
    url: `/demos/${id}/`,
    result: null,
    topic: match ? match[1] : id,
    variant: match ? match[2] : null,
    ...extra,
  };
};

const off = demo('2026-11-27-a-off');
const on = demo('2026-11-27-a-on');

function links(html) {
  return [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map(([, href, inner]) => ({
      href,
      text: inner.replace(/<span[^>]*aria-hidden="true"[^>]*>[^<]*<\/span>/g, '')
        .replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
    }));
}

const count = (html, needle) => html.split(needle).length - 1;

test('groups a pair into one card', () => {
  const html = renderList([off, on]);
  assert.equal(count(html, 'class="topic-card"'), 1);
  assert.equal(count(html, 'href="/?demo=2026-11-27-a-off"'), 1);
  assert.equal(count(html, 'href="/?demo=2026-11-27-a-on"'), 1);
  assert.match(html, /기본 개발 \(off\)/);
  assert.match(html, /접근성 자료 적용 \(on\)/);
});

test('renders a topic with only one variant', () => {
  const html = renderList([on]);
  assert.equal(count(html, 'class="topic-card"'), 1);
  assert.equal(count(html, '-off"'), 0);
  assert.equal(count(html, 'href="/?demo=2026-11-27-a-on"'), 1);
});

test('renders a legacy demo without variant', () => {
  const html = renderList([demo('2026-11-26-b')]);
  assert.equal(count(html, 'class="topic-card"'), 1);
  assert.deepEqual(links(html), [{ href: '/?demo=2026-11-26-b', text: '상세 보기 · 가' }]);
});

test('link names start with the visible label and include the topic', () => {
  assert.deepEqual(links(renderList([off, on])).map(({ text }) => text), ['기본 개발 (off) · 가', '접근성 자료 적용 (on) · 가']);
});

test('card uses the on title and description when both exist', () => {
  const html = renderList([{ ...off, title: '기본 제목', description: '기본 설명' }, { ...on, title: '개선 제목', description: '개선 설명' }]);
  assert.match(html, /<h3>개선 제목<\/h3>/);
  assert.match(html, /개선 설명/);
  assert.doesNotMatch(html, /기본 제목|기본 설명/);
});

test('card falls back to the off title without an on demo', () => {
  assert.match(renderList([{ ...off, title: '기본 제목' }]), /<h3>기본 제목<\/h3>/);
});

test('counts topics and demos next to the heading', () => {
  assert.match(renderList([off, on]), /주제 1개 · 데모 2개/);
});

test('detail links to the counterpart', () => {
  const counterpart = links(renderDetail(off, [off, on])).find(({ href }) => href === '/?demo=2026-11-27-a-on');
  assert.ok(counterpart);
  assert.equal(counterpart.text, '접근성 자료 적용 (on) 상세 보기');
});

test('detail shows the variant label', () => {
  assert.match(renderDetail(on, [off, on]), /class="variant-badge"[^>]*>접근성 자료 적용 \(on\)</);
});
