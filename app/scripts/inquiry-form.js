// Inquiry Form Category Switcher
(function () {
  'use strict';

  const formData = {
    bl: {
      color: 'red',
      sectionTitle: 'BL部品',
      categories: [
        { value: 'bl-trouble', text: 'BL部品でお困りの場合' },
        { value: 'bl-standard', text: 'BL認定基準' },
        { value: 'bl-application', text: 'BL認定申請' },
        { value: 'bl-certificate', text: 'BLマーク証紙' },
        { value: 'jis', text: 'JIS製品認証' },
        { value: 'traceability-alarm', text: 'トレーサビリティ関連（住警器）' },
        { value: 'traceability-led', text: 'トレーサビリティ関連（LED）' },
        { value: 'other', text: 'その他' },
      ],
      subcategories: [
        { value: 'bl-test', text: 'BL部品試験' },
        { value: 'environment', text: '環境・設備' },
        { value: 'construction', text: '工事用材料' },
        { value: 'structure', text: '構造' },
        { value: 'fire-prevention', text: '防耐火' },
        { value: 'materials', text: '材料・施工' },
        { value: 'foundation', text: '基礎構造・地盤' },
        { value: 'other-sub', text: 'その他' },
      ],
    },
    test: {
      color: 'blue',
      sectionTitle: '試験業務',
      categories: [
        { value: 'test-business', text: '試験業務', checked: true },
        { value: 'building-eval', text: '建築基準法性能評価（大臣認定）' },
        { value: 'other-test', text: 'その他' },
      ],
      subcategories: [
        { value: 'assessment', text: '評定・建設技術審査証明' },
        { value: 'research', text: '調査・研究業務' },
      ],
    },
    housing: {
      color: 'orange',
      sectionTitle: '住宅・建築評価',
      categories: [
        { value: 'inspection', text: '建築確認検査等', checked: true },
        { value: 'housing-performance', text: '住宅性能評価・長期優良住宅等' },
        { value: 'other-housing', text: 'その他' },
      ],
      subcategories: [
        { value: 'structural-calc', text: '構造計算適合性判定' },
        { value: 'casbee', text: 'CASBEE・BELS・省エネ査定' },
      ],
    },
    iso: {
      color: 'teal',
      sectionTitle: 'ISO審査・登録',
      categories: [{ value: 'iso-audit', text: 'ISO審査・登録' }],
      subcategories: [],
    },
    research: {
      color: 'purple',
      sectionTitle: '調査・研究',
      categories: [
        {
          value: 'research-paper',
          text: '少子高齢社会やストック型社会への対応に関する調査研究・論文等',
        },
        {
          value: 'building-info',
          text: '日本の建築規制、住宅事情・住宅政策等に関する情報',
        },
      ],
      subcategories: [],
    },
    recruit: {
      color: 'green',
      sectionTitle: '採用情報',
      categories: [
        { value: 'entry', text: 'エントリー', checked: true },
        { value: 'one-day', text: '1日仕事体験応募（説明会含む）' },
        { value: 'internship', text: 'インターンシップ応募' },
        { value: 'inquiry', text: 'お問い合わせ' },
      ],
      subcategories: [],
      isRecruit: true,
    },
    other: {
      color: 'gray',
      sectionTitle: 'その他',
      categories: [{ value: 'other-inquiry', text: 'その他' }],
      subcategories: [],
    },
  };

  const colorClasses = {
    red: { border: '#fe100a', bg: '#f9dfe0' },
    blue: { border: '#0066cc', bg: '#d6e9f8' },
    orange: { border: '#ff6600', bg: '#ffe8d6' },
    teal: { border: '#008b8b', bg: '#d6f0f0' },
    purple: { border: '#9370db', bg: '#ede7f6' },
    green: { border: '#2d8b57', bg: '#e0f2e9' },
    gray: { border: '#828282', bg: '#eeeeee' },
  };

  function updateFormContent(categoryKey) {
    const data = formData[categoryKey];
    if (!data) return;

    // Update section title
    const sectionTitle = document.querySelector('.hpd-inquiry__section-title');
    if (sectionTitle) {
      sectionTitle.textContent = data.sectionTitle;
    }

    // Update categories in form
    const categoryGrid = document.querySelector('.hpd-inquiry__category-grid');
    if (categoryGrid) {
      categoryGrid.innerHTML = '';
      // Add vertical class for recruit
      if (data.isRecruit) {
        categoryGrid.classList.add('hpd-inquiry__category-grid--vertical');
      } else {
        categoryGrid.classList.remove('hpd-inquiry__category-grid--vertical');
      }

      data.categories.forEach((cat, index) => {
        const label = document.createElement('label');
        label.className = 'hpd-inquiry__category-option';

        const radio = document.createElement('input');
        radio.className = 'hpd-inquiry__radio';
        radio.type = 'radio';
        radio.name = 'inquiry-category';
        radio.value = cat.value;
        if (index === 0 || cat.checked) {
          radio.checked = true;
        }

        const span = document.createElement('span');
        span.className = 'hpd-inquiry__category-option-text';
        span.textContent = cat.text;

        label.appendChild(radio);
        label.appendChild(span);
        categoryGrid.appendChild(label);
      });
    }

    // Update subcategories (分野) - only show if has subcategories
    const subcategoryField = document.querySelector(
      '.hpd-inquiry__subcategory-field'
    );
    if (subcategoryField) {
      if (data.subcategories.length > 0) {
        subcategoryField.style.display = 'flex';
        const subcategoryGrid = subcategoryField.querySelector(
          '.hpd-inquiry__category-grid'
        );
        if (subcategoryGrid) {
          subcategoryGrid.innerHTML = '';
          data.subcategories.forEach((subcat, index) => {
            const label = document.createElement('label');
            label.className = 'hpd-inquiry__category-option';

            const radio = document.createElement('input');
            radio.className = 'hpd-inquiry__radio';
            radio.type = 'radio';
            radio.name = 'inquiry-subcategory';
            radio.value = subcat.value;
            if (index === 0) {
              radio.checked = true;
            }

            const span = document.createElement('span');
            span.className = 'hpd-inquiry__category-option-text';
            span.textContent = subcat.text;

            label.appendChild(radio);
            label.appendChild(span);
            subcategoryGrid.appendChild(label);
          });
        }
      } else {
        subcategoryField.style.display = 'none';
      }
    }

    // Show/hide recruit specific fields
    const recruitFields = document.querySelectorAll(
      '.hpd-inquiry__recruit-fields'
    );
    const recruitFieldGroup = document.querySelector(
      '.hpd-inquiry__recruit-fields.is-group'
    );
    recruitFields.forEach((field) => {
      field.style.display = data.isRecruit ? 'block' : 'none';
    });

    if (recruitFieldGroup) {
      recruitFieldGroup.style.display = data.isRecruit ? 'flex' : 'none';
    }

    // Show/hide headers for recruit and other
    const isSimpleForm = data.isRecruit || categoryKey === 'other';

    const contentHeader = document.querySelector(
      '.hpd-inquiry__content-header'
    );
    const contactHeader = document.querySelector(
      '.hpd-inquiry__contact-header--main'
    );

    // Different content fields
    const categoryFieldRecruit = document.querySelector(
      '.hpd-inquiry__category-field-recruit'
    );
    const contentFieldSimple = document.querySelector(
      '.hpd-inquiry__content-field-simple'
    );
    const contentFieldNormal = document.querySelector(
      '.hpd-inquiry__content-field'
    );

    const categoryField = document.querySelector(
      '.hpd-inquiry__category-field'
    );

    if (contentHeader) {
      contentHeader.style.display = isSimpleForm ? 'none' : 'block';
    }
    if (contactHeader) {
      contactHeader.style.display = isSimpleForm ? 'none' : 'block';
    }

    // Show recruit category field only for recruit
    if (categoryFieldRecruit) {
      categoryFieldRecruit.style.display = data.isRecruit ? 'flex' : 'none';
    }

    // Show simple content field for other (not recruit)
    if (contentFieldSimple) {
      contentFieldSimple.style.display =
        categoryKey === 'other' ? 'none' : 'flex';
      contentFieldSimple.style.display = data.isRecruit ? 'none' : 'flex';
    }

    if (categoryField) {
      categoryField.style.display = data.isRecruit ? 'none' : 'flex';
    }

    // Show normal content field for other categories
    if (contentFieldNormal) {
      contentFieldNormal.style.display = isSimpleForm ? 'none' : 'flex';
    }

    // if (categoryField) {
    //   // For recruit, change label text to 内容
    //   const labelText = categoryField.querySelector('.hpd-inquiry__label-text');
    //   if (labelText) {
    //     labelText.textContent = data.isRecruit ? '内容' : 'カテゴリ';
    //   }
    // }

    // Update colors
    updateColors(data.color);
  }

  function updateColors(color) {
    const colorValue = colorClasses[color] || colorClasses.red;
    const form = document.querySelector('.hpd-inquiry__form');
    if (!form) return;

    // Remove all color classes
    Object.keys(colorClasses).forEach((key) => {
      form.classList.remove(`color-${key}`);
    });

    // Add new color class
    form.classList.add(`color-${color}`);

    // Update CSS custom properties for dynamic colors
    form.style.setProperty('--inquiry-theme-color', colorValue.border);
    form.style.setProperty('--inquiry-header-bg', colorValue.bg);
  }

  function init() {
    const categoryRadios = document.querySelectorAll(
      '.hpd-inquiry__categories .hpd-inquiry__radio'
    );

    categoryRadios.forEach((radio) => {
      radio.addEventListener('change', function () {
        const categoryKey = this.value;
        updateFormContent(categoryKey);
      });
    });

    // Initialize with default (BL)
    const checkedRadio = document.querySelector(
      '.hpd-inquiry__categories .hpd-inquiry__radio:checked'
    );
    if (checkedRadio) {
      updateFormContent(checkedRadio.value);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
