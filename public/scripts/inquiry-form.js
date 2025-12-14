// Inquiry Form Category Switcher
(function () {
  'use strict';

  const formData = {
    bl: {
      color: 'red',
      sectionTitle: 'BL部品',
      categories: [{
        value: 'bl-trouble',
        text: 'BL部品でお困りの場合'
      }, {
        value: 'bl-standard',
        text: 'BL認定基準'
      }, {
        value: 'bl-application',
        text: 'BL認定申請'
      }, {
        value: 'bl-certificate',
        text: 'BLマーク証紙'
      }, {
        value: 'jis',
        text: 'JIS製品認証'
      }, {
        value: 'traceability-alarm',
        text: 'トレーサビリティ関連（住警器）'
      }, {
        value: 'traceability-led',
        text: 'トレーサビリティ関連（LED）'
      }, {
        value: 'other',
        text: 'その他'
      }],
      subcategories: [
        // { value: 'bl-test', text: 'BL部品試験' },
        // { value: 'environment', text: '環境・設備' },
        // { value: 'construction', text: '工事用材料' },
        // { value: 'structure', text: '構造' },
        // { value: 'fire-prevention', text: '防耐火' },
        // { value: 'materials', text: '材料・施工' },
        // { value: 'foundation', text: '基礎構造・地盤' },
        // { value: 'other-sub', text: 'その他' },
      ]
    },
    test: {
      color: 'blue',
      sectionTitle: '試験・評定',
      categories: [{
        value: 'test-business',
        text: '試験業務',
        checked: true
      }, {
        value: 'assessment',
        text: '評定・建設技術審査証明'
      }, {
        value: 'building-eval',
        text: '建築基準法性能評価（大臣認定）'
      }, {
        value: 'research',
        text: '調査・研究業務'
      }, {
        value: 'other-test',
        text: 'その他'
      }],
      subcategories: [{
        value: 'bl-test',
        text: 'BL部品試験'
      }, {
        value: 'structure',
        text: '構造'
      }, {
        value: 'materials',
        text: '材料・施工'
      }, {
        value: 'environment',
        text: '環境・設備'
      }, {
        value: 'fire-prevention',
        text: '防耐火'
      }, {
        value: 'foundation',
        text: '基礎構造・地盤'
      }, {
        value: 'construction',
        text: '工事用材料'
      }, {
        value: 'other-sub',
        text: 'その他'
      }]
    },
    housing: {
      color: 'orange',
      sectionTitle: '住宅・建築評価',
      categories: [{
        value: 'inspection',
        text: '建築確認検査等',
        checked: true
      }, {
        value: 'structural-calc',
        text: '構造計算適合性判定'
      }, {
        value: 'housing-performance',
        text: '住宅性能評価・長期優良住宅等'
      }, {
        value: 'casbee',
        text: 'CASBEE・BELS・省エネ査定'
      }, {
        value: 'other-housing',
        text: 'その他'
      }],
      subcategories: [
        // { value: 'structural-calc', text: '構造計算適合性判定' },
        // { value: 'casbee', text: 'CASBEE・BELS・省エネ査定' },
      ]
    },
    iso: {
      color: 'teal',
      sectionTitle: 'ISO審査・登録',
      categories: [{
        value: 'certification',
        text: '認証取得'
      }, {
        value: 'registration',
        text: '認証登録組織'
      }, {
        value: 'iso-audit',
        text: 'ISO/IEC 27001：2022 規格改訂'
      }, {
        value: 'other-iso',
        text: 'その他'
      }],
      subcategories: []
    },
    research: {
      color: 'purple',
      sectionTitle: '調査・研究',
      categories: [{
        value: 'forum',
        text: '住宅における良好な温熱環境実現推進フォーラム'
      }, {
        value: 'sustainable-research',
        text: 'その他の調査研究（サステナブル居住研究センター）'
      }, {
        value: 'tukuba-research',
        text: 'その他の調査研究（つくば建築試験研究センター）'
      }],
      subcategories: []
    },
    recruit: {
      color: 'green',
      sectionTitle: '採用情報',
      categories: [{
        value: 'entry',
        text: 'エントリー',
        checked: true
      }, {
        value: 'one-day',
        text: '1日仕事体験応募（説明会含む）'
      }, {
        value: 'internship',
        text: 'インターンシップ応募'
      }, {
        value: 'inquiry',
        text: 'お問い合わせ'
      }],
      subcategories: [],
      isRecruit: true
    },
    other: {
      color: 'gray',
      sectionTitle: 'その他',
      categories: [{
        value: 'blf-advisor',
        text: 'BLRアドバイザー登録制度'
      }, {
        value: 'rem-quality',
        text: 'リフォーム業務品質審査登録制度'
      }, {
        value: 'hld-service',
        text: '住宅履歴情報管理支援サービス'
      }, {
        value: 'pr-homepage',
        text: '広報・ホームページ'
      }, {
        value: 'other-inquiry',
        text: 'その他、当財団に関するお問い合わせ'
      }],
      subcategories: []
    }
  };
  const colorClasses = {
    red: {
      border: '#e68082',
      bg: '#f9dfe0'
    },
    blue: {
      border: '#4987B5',
      bg: '#D3E5F1'
    },
    orange: {
      border: '#F0962B',
      bg: '#FBE5CA'
    },
    teal: {
      border: '#68BB61',
      bg: '#D9EED7'
    },
    purple: {
      border: '#5AB4B4',
      bg: '#D6ECEC'
    },
    green: {
      border: '#7F7F7F',
      bg: '#DFDFDF'
    },
    gray: {
      border: '#7F7F7F',
      bg: '#DFDFDF'
    }
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
    // Update categories in form - FIX: chỉ định rõ selector trong category-field
    const categoryField = document.querySelector('.hpd-inquiry__category-field');
    const categoryGrid = categoryField ? categoryField.querySelector('.hpd-inquiry__category-grid') : null;
    if (categoryGrid) {
      categoryGrid.innerHTML = '';
      // Add vertical class for recruit
      if (data.isRecruit) {
        categoryGrid.classList.add('hpd-inquiry__category-grid--vertical');
      } else {
        categoryGrid.classList.remove('hpd-inquiry__category-grid--vertical');
      }
      if (categoryKey === 'research') {
        categoryGrid.classList.add('is-one-column');
      } else {
        categoryGrid.classList.remove('is-one-column');
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
    const subcategoryField = document.querySelector('.hpd-inquiry__subcategory-field');
    if (subcategoryField) {
      if (data.subcategories.length > 0) {
        subcategoryField.style.display = 'flex';
        const subcategoryGrid = subcategoryField.querySelector('.hpd-inquiry__category-grid');
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
    const recruitFields = document.querySelectorAll('.hpd-inquiry__recruit-fields');
    const recruitFieldGroup = document.querySelector('.hpd-inquiry__recruit-fields.is-group');
    recruitFields.forEach(field => {
      field.style.display = data.isRecruit ? 'block' : 'none';
    });
    if (recruitFieldGroup) {
      recruitFieldGroup.style.display = data.isRecruit ? 'flex' : 'none';
    }

    // Show/hide headers for recruit and other
    const isSimpleForm = data.isRecruit;
    const contentHeader = document.querySelector('.hpd-inquiry__content-header');
    const contactHeader = document.querySelector('.hpd-inquiry__contact-header--main');

    // Different content fields
    const categoryFieldRecruit = document.querySelector('.hpd-inquiry__category-field-recruit');
    const contentFieldSimple = document.querySelector('.hpd-inquiry__content-field-simple');
    const contentFieldNormal = document.querySelector('.hpd-inquiry__content-field');

    // const categoryField = document.querySelector(
    //   '.hpd-inquiry__category-field'
    // );

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
      contentFieldSimple.style.display = categoryKey === 'other' ? 'none' : 'flex';
      contentFieldSimple.style.display = data.isRecruit ? 'none' : 'flex';
    }
    if (categoryField) {
      categoryField.style.display = data.isRecruit ? 'none' : 'flex';
    }

    // Show normal content field for other categories
    if (contentFieldNormal) {
      contentFieldNormal.style.display = isSimpleForm ? 'none' : 'flex';
    }
    const companyField = document.querySelector('label[for="company"]')?.closest('.hpd-inquiry__field');
    const departmentField = document.querySelector('label[for="department"]')?.closest('.hpd-inquiry__field');
    if (companyField) {
      companyField.style.display = categoryKey === 'recruit' ? 'none' : 'flex';
    }
    if (departmentField) {
      departmentField.style.display = categoryKey === 'recruit' ? 'none' : 'flex';
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
    togglePhoneRequired(categoryKey);
    toggleAddressRequired(categoryKey);
    if (categoryKey === 'recruit') {
      setupRecruitCategoryListener();
    }
  }
  function toggleCategoryRecruitFields(recruitCategoryValue) {
    const resumeField = document.querySelector('label[for="resume"]')?.closest('.hpd-inquiry__field');
    const entrySheetField = document.querySelector('label[for="entry-sheet"]')?.closest('.hpd-inquiry__field');
    const dateField = document.querySelector('label[for="date"]')?.closest('.hpd-inquiry__field');
    const internshipField = document.querySelector('label[for="internship"]')?.closest('.hpd-inquiry__field');
    const internshipSurveyField = document.querySelector('label[for="internship-survey"]')?.closest('.hpd-inquiry__field');
    if (resumeField && entrySheetField) {
      if (recruitCategoryValue === 'entry') {
        resumeField.style.display = 'flex';
        entrySheetField.style.display = 'flex';
      } else {
        resumeField.style.display = 'none';
        entrySheetField.style.display = 'none';
      }
    }
    if (dateField) {
      if (recruitCategoryValue === 'one-day') {
        dateField.style.display = 'flex';
      } else {
        dateField.style.display = 'none';
      }
    }
    if (internshipField && internshipSurveyField) {
      if (recruitCategoryValue === 'internship') {
        internshipField.style.display = 'flex';
        internshipSurveyField.style.display = 'flex';
      } else {
        internshipField.style.display = 'none';
        internshipSurveyField.style.display = 'none';
      }
    }
  }
  function setupRecruitCategoryListener() {
    const recruitCategoryRadios = document.querySelectorAll('input[name="inquiry-category-recruit"]');
    recruitCategoryRadios.forEach(radio => {
      const newRadio = radio.cloneNode(true);
      radio.parentNode.replaceChild(newRadio, radio);
      newRadio.addEventListener('change', function () {
        const recruitCategoryValue = this.value;
        toggleAddressRequired('recruit');
        toggleCategoryRecruitFields(recruitCategoryValue);
      });
    });

    // Initialize with current checked value
    const checkedRecruitRadio = document.querySelector('input[name="inquiry-category-recruit"]:checked');
    if (checkedRecruitRadio) {
      toggleCategoryRecruitFields(checkedRecruitRadio.value);
    }
  }
  function toggleAddressRequired(categoryKey) {
    const addressField = document.querySelector('label[for="address"]')?.closest('.hpd-inquiry__field');
    if (!addressField) return;
    const addressInput = document.querySelector('#address');
    const addressRequired = addressField.querySelector('.hpd-inquiry__required');
    if (!addressInput || !addressRequired) return;

    // Check if category is recruit
    if (categoryKey === 'recruit') {
      const recruitCategoryRadio = document.querySelector('input[name="inquiry-category-recruit"]:checked');
      const recruitCategoryValue = recruitCategoryRadio ? recruitCategoryRadio.value : null;
      const requiredValues = ['entry', 'one-day', 'internship'];
      if (recruitCategoryValue && requiredValues.includes(recruitCategoryValue)) {
        // Show required badge and add required attribute
        addressRequired.style.display = 'inline';
        addressInput.setAttribute('required', 'required');
      } else {
        // Hide required badge and remove required attribute
        addressRequired.style.display = 'none';
        addressInput.removeAttribute('required');
      }
    } else {
      // Not recruit category - hide required badge and remove required
      addressRequired.style.display = 'none';
      addressInput.removeAttribute('required');
    }
  }
  function updateColors(color) {
    const colorValue = colorClasses[color] || colorClasses.red;
    const form = document.querySelector('.hpd-inquiry__form');
    if (!form) return;

    // Remove all color classes
    Object.keys(colorClasses).forEach(key => {
      form.classList.remove(`color-${key}`);
    });

    // Add new color class
    form.classList.add(`color-${color}`);

    // Update CSS custom properties for dynamic colors
    form.style.setProperty('--inquiry-theme-color', colorValue.border);
    form.style.setProperty('--inquiry-header-bg', colorValue.bg);
  }
  function togglePhoneRequired(categoryKey) {
    let phoneRequired = null;
    const phoneFieldContainer = document.querySelector('.hpd-inquiry__phone-group')?.closest('.hpd-inquiry__field');
    if (phoneFieldContainer) {
      const label = phoneFieldContainer.querySelector('.hpd-inquiry__label');
      if (label) {
        phoneRequired = label.querySelector('.hpd-inquiry__required');
      }
    }
    const phoneInputs = document.querySelectorAll('.hpd-inquiry__phone-input');
    if (!phoneRequired || !phoneInputs.length) {
      return;
    }
    const checkPhoneValue = () => {
      if (categoryKey === 'test') {
        phoneRequired.style.display = 'none';
        phoneInputs.forEach(input => {
          input.removeAttribute('required');
        });
      } else {
        phoneRequired.style.display = 'inline';
        if (categoryKey !== 'test') {
          phoneInputs.forEach(input => {
            input.setAttribute('required', 'required');
          });
        } else {
          phoneInputs.forEach(input => {
            input.removeAttribute('required');
          });
        }
      }
    };
    checkPhoneValue();
  }
  function setupRecruitCategoryListener() {
    const recruitCategoryRadios = document.querySelectorAll('input[name="inquiry-category-recruit"]');
    recruitCategoryRadios.forEach(radio => {
      // Remove old listener by cloning
      const newRadio = radio.cloneNode(true);
      radio.parentNode.replaceChild(newRadio, radio);
      newRadio.addEventListener('change', function () {
        const recruitCategoryValue = this.value;
        toggleAddressRequired('recruit');
        toggleCategoryRecruitFields(recruitCategoryValue);
      });
    });

    // Initialize with current checked value
    const checkedRecruitRadio = document.querySelector('input[name="inquiry-category-recruit"]:checked');
    if (checkedRecruitRadio) {
      toggleCategoryRecruitFields(checkedRecruitRadio.value);
    }
  }
  function init() {
    const categoryRadios = document.querySelectorAll('.hpd-inquiry__categories .hpd-inquiry__radio');
    categoryRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        const categoryKey = this.value;
        updateFormContent(categoryKey);
      });
    });

    // Initialize with default (BL)
    const checkedRadio = document.querySelector('.hpd-inquiry__categories .hpd-inquiry__radio:checked');
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