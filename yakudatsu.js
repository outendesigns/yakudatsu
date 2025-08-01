//yakudatsu.js v1.2

/*
MIT License

Copyright (c) 2025 Eric R Outen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

document.addEventListener('DOMContentLoaded', () => {
  const helperSpans = document.querySelectorAll('.yakudatsu');

  helperSpans.forEach(span => {
    const helpText = span.textContent.trim();
    const prevElem = span.previousElementSibling;
    if (!prevElem) return;

    // Extract max width from class (e.g. helper-width-250)
    const widthClass = Array.from(span.classList).find(cls => cls.startsWith('helper-width-'));
    let maxWidth = '200px'; // default
    if (widthClass) {
      const match = widthClass.match(/helper-width-(\d+)/);
      if (match) maxWidth = `${match[1]}px`;
    }

    // Create icon
    const icon = document.createElement('span');
    icon.textContent = '?';
    icon.setAttribute('tabindex', '0');
    Object.assign(icon.style, {
      display: 'inline-block',
      width: '18px',
      height: '18px',
      lineHeight: '18px',
      textAlign: 'center',
      borderRadius: '50%',
      backgroundColor: '#f8f6ed',
      color: '#eb493a',
      border: '1px solid black',
      fontWeight: 'bold',
      fontSize: '12px',
      marginLeft: '0.5em',
      cursor: 'pointer',
      position: 'relative',
      fontFamily: 'sans-serif'
    });

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = helpText;
    Object.assign(tooltip.style, {
      position: 'absolute',
      bottom: '125%',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '8px',
      background: '#333',
      color: '#fff',
      borderRadius: '4px',
      fontSize: '0.75em',
      visibility: 'hidden',
      opacity: '0',
      transition: 'opacity 0.3s ease',
      zIndex: '1000',
      width: maxWidth,
      wordWrap: 'break-word',
      whiteSpace: 'normal'
    });

    // Tooltip visibility events
    icon.appendChild(tooltip);
    icon.addEventListener('mouseenter', () => {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    });
    icon.addEventListener('mouseleave', () => {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    });
    icon.addEventListener('focus', () => {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    });
    icon.addEventListener('blur', () => {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    });

    prevElem.appendChild(icon);
    span.remove();
  });
});