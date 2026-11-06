import { describe, expect, it } from 'vitest';
import { emailDomain, isFreeMail, normCompanyName, normDomain, normEmail, normLinkedin, normPhone } from '../../lib/normalize';

describe('normEmail', () => {
  it('lower cases and trims', () => {
    expect(normEmail('  EVA@dekade.nl ')).toBe('eva@dekade.nl');
    expect(normEmail('Eva.Jansen@DeKade.NL')).toBe('eva.jansen@dekade.nl');
  });
  it('strips mailto and display names', () => {
    expect(normEmail('mailto:Tom@dekade.nl')).toBe('tom@dekade.nl');
    expect(normEmail('Eva Jansen <EVA@dekade.nl>')).toBe('eva@dekade.nl');
  });
  it('rejects things that are not emails', () => {
    expect(normEmail('')).toBeNull();
    expect(normEmail(null)).toBeNull();
    expect(normEmail('eva at dekade.nl')).toBeNull();
    expect(normEmail('eva@dekade')).toBeNull();
    expect(normEmail('@dekade.nl')).toBeNull();
  });
});

describe('normDomain', () => {
  it('strips scheme, www and path', () => {
    expect(normDomain('https://www.dekade.nl/taproom')).toBe('dekade.nl');
    expect(normDomain('http://dekade.nl')).toBe('dekade.nl');
    expect(normDomain('WWW.DEKADE.NL')).toBe('dekade.nl');
    expect(normDomain('dekade.nl/')).toBe('dekade.nl');
    expect(normDomain('https://dekade.nl:8443/a?b=c#d')).toBe('dekade.nl');
    expect(normDomain('dekade.nl.')).toBe('dekade.nl');
  });
  it('reduces subdomains to the registrable domain', () => {
    expect(normDomain('shop.example.co.uk')).toBe('example.co.uk');
    expect(normDomain('https://www.shop.example.co.uk/basket')).toBe('example.co.uk');
    expect(normDomain('blog.dekade.nl')).toBe('dekade.nl');
    expect(normDomain('a.b.c.example.com.au')).toBe('example.com.au');
    expect(normDomain('example.co.nz')).toBe('example.co.nz');
  });
  it('keeps hosting platform subdomains apart', () => {
    expect(normDomain('studio-fjell.netlify.app')).toBe('studio-fjell.netlify.app');
    expect(normDomain('https://corvo.myshopify.com/products')).toBe('corvo.myshopify.com');
  });
  it('reduces an email to its domain', () => {
    expect(normDomain('eva@dekade.nl')).toBe('dekade.nl');
    expect(emailDomain('eva@mail.dekade.nl')).toBe('dekade.nl');
  });
  it('converts IDN to punycode', () => {
    expect(normDomain('https://bäckerei.de')).toBe('xn--bckerei-5wa.de');
  });
  it('rejects junk, IPs and bare suffixes', () => {
    expect(normDomain('')).toBeNull();
    expect(normDomain('localhost')).toBeNull();
    expect(normDomain('192.168.1.1')).toBeNull();
    expect(normDomain('co.uk')).toBeNull();
    expect(normDomain('not a domain')).toBeNull();
  });
});

describe('isFreeMail', () => {
  it('spots free mail by email or domain', () => {
    expect(isFreeMail('someone@gmail.com')).toBe(true);
    expect(isFreeMail('GMAIL.COM')).toBe(true);
    expect(isFreeMail('https://www.hotmail.nl')).toBe(true);
    expect(isFreeMail('eva@dekade.nl')).toBe(false);
    expect(isFreeMail('dekade.nl')).toBe(false);
  });
  it('accepts extra domains from the table', () => {
    expect(isFreeMail('x@freemail.example', ['freemail.example'])).toBe(true);
  });
});

describe('normLinkedin', () => {
  it('normalises every common profile URL shape', () => {
    const want = 'linkedin.com/in/eva-jansen';
    expect(normLinkedin('https://www.linkedin.com/in/eva-jansen/')).toBe(want);
    expect(normLinkedin('http://linkedin.com/in/Eva-Jansen')).toBe(want);
    expect(normLinkedin('linkedin.com/in/eva-jansen?trk=public_profile')).toBe(want);
    expect(normLinkedin('https://nl.linkedin.com/in/eva-jansen')).toBe(want);
    expect(normLinkedin('https://www.linkedin.com/in/eva-jansen/details/experience/')).toBe(want);
    expect(normLinkedin('  www.linkedin.com/in/EVA-JANSEN#about ')).toBe(want);
  });
  it('decodes percent encoded slugs', () => {
    expect(normLinkedin('https://www.linkedin.com/in/in%C3%A8s-moreau')).toBe('linkedin.com/in/inès-moreau');
  });
  it('rejects company pages and other URLs', () => {
    expect(normLinkedin('https://www.linkedin.com/company/dekade')).toBeNull();
    expect(normLinkedin('https://www.linkedin.com/sales/lead/ACwAA123')).toBeNull();
    expect(normLinkedin('https://dekade.nl/in/eva')).toBeNull();
    expect(normLinkedin('')).toBeNull();
  });
});

describe('normPhone and normCompanyName', () => {
  it('normalises Dutch and international numbers', () => {
    expect(normPhone('06 1234 5678')).toBe('+31612345678');
    expect(normPhone('+31 6 1234 5678')).toBe('+31612345678');
    expect(normPhone('0049 30 1234567')).toBe('+49301234567');
  });
  it('drops legal suffixes for fuzzy matching', () => {
    expect(normCompanyName('Kessler Werkzeugbau GmbH')).toBe('kessler werkzeugbau');
    expect(normCompanyName('Atlas Freight B.V.')).toBe('atlas freight');
    expect(normCompanyName('Maison Orée')).toBe('maison oree');
    expect(normCompanyName('Vellum & Co')).toBe('vellum and co');
  });
});
