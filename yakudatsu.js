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
    let maxWidth = '300px'; // default
    if (widthClass) {
      const match = widthClass.match(/helper-width-(\d+)/);
      if (match) maxWidth = `${match[1]}px`;
    }

    // Extract background color from class (e.g. helper-bgcolor-black or hexcode helper-bgcolor-#123456)
    const bgColor = Array.from(span.classList).find(cls => cls.startsWith('helper-bgcolor-'));
    let defaultBgColor = '#666';
    if (bgColor) {
      const match = bgColor.match(/helper-bgcolor-([a-zA-Z]+|#[0-9a-fA-F]{3,6})/);
      if (match) defaultBgColor = `${match[1]}`;
      console.log(defaultBgColor);
    }

    // Extract font color from class (e.g. helper-fontcolor-white or hexcode helper-fontcolor-#ffffff)
    const fontColor = Array.from(span.classList).find(cls => cls.startsWith('helper-fontcolor-'));
    let defaultFontColor = '#fff';
    if (fontColor) {
      const match = fontColor.match(/helper-fontcolor-([a-zA-Z]+|#[0-9a-fA-F]{3,6})/);
      if (match) defaultFontColor = `${match[1]}`;
    }

    const fontSize = Array.from(span.classList).find(cls => cls.startsWith('helper-fontsize-'));
    let defaultFontSize = '12px';
    if (fontSize) {
      const match = fontSize.match(/helper-fontsize-(\d+)/);
      if (match) defaultFontSize = `${match[1]}px`;
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
      backgroundColor: defaultBgColor,
      color: defaultFontColor,
      border: `1px solid ${defaultFontColor}`,
      fontWeight: 'bold',
      fontSize: defaultFontSize,
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
      bottom: '50%',
      transform: 'translateY(50%)',
      left: '200%',
      padding: '8px',
      background: defaultBgColor,
      color: defaultFontColor,
      borderRadius: '4px',
      fontSize: defaultFontSize,
      visibility: 'hidden',
      opacity: '0',
      transition: 'opacity 0.3s ease',
      zIndex: '1000',
      width: maxWidth,
      wordWrap: 'break-word',
      whiteSpace: 'normal'
    });

    // Create arrow
    const arrow = document.createElement('div');
    Object.assign(arrow.style, {
      content: "''",
      position: 'absolute',
      left: '-6px',      // places arrow to the left of tooltip box
      top: '50%',
      transform: 'translateY(-50%)',
      width: '0',
      height: '0',
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderRight: `10px solid ${defaultBgColor}`,   // matches tooltip background
    });
    tooltip.appendChild(arrow);

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