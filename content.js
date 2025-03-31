let keydownListener = null;
let clickListener = null;

function cleanupSeterraEditor() {
  if (keydownListener) {
    document.removeEventListener('keydown', keydownListener);
    keydownListener = null;
  }
  if (clickListener) {
    document.removeEventListener('click', clickListener);
    clickListener = null;
  }

  const elementsToHide = `
    .navbar,
    .footer,
    .sidebar,
    .ad-container,
    .social-share,
    .premium-banner,
    .notification-banner,
    .game-items-checkboxes_checkboxButtons__dawSF,
    .radio-button_mark__Djylp,
    .form-field_formField__8jNau:has([name="enable-public-leaderboard"]),
    .form-field_formField__8jNau:has([name="anonymize-leaderboard"]),
    .challenge-form_title__c2KAd
  `;

  const style = document.createElement('style');
  style.textContent = `
    ${elementsToHide} {
      display: none !important;
    }
    .quiz-editor {
      width: 100% !important;
      max-width: none !important;
      padding: 0 !important;
    }
    .editor-workspace {
      margin: 0 !important;
      padding: 20px !important;
      padding-top: 70px !important;
    }
    .modal_content__ZijTp {
      width: 100% !important;
      max-width: 500px !important;
      margin: 0 auto !important;
      padding: 20px !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
    }
    .modal_content__ZijTp .form-field_formFields__DpY83 {
      width: 100% !important;
      margin: 0 !important;
      transform: none !important;
    }
    .modal_content__ZijTp .form-field_formField__8jNau {
      width: 100% !important;
      margin-bottom: 16px !important;
    }
    .modal_content__ZijTp .text-input_textInput__KCdAH {
      width: 100% !important;
    }
    .modal_content__ZijTp .radio-buttons_variantHorizontal__YgMaQ {
      margin: 0 !important;
      transform: none !important;
      gap: 8px !important;
    }
    .map-maker_buttons__NYCsL {
      display: flex !important;
      gap: 8px !important;
      margin-top: 20px !important;
    }
    button {
      transition: all 0.2s ease !important;
      border-radius: 8px !important;
      font-weight: 500 !important;
      padding: 8px 16px !important;
    }
    /* Form field enhancements */
    .form-field_formField__8jNau {
      margin-bottom: 20px !important;
    }
    .text-input_textInput__KCdAH {
      border-radius: 8px !important;
      border: 2px solid #e0e0e0 !important;
      padding: 10px 12px !important;
      transition: all 0.2s ease !important;
    }
    .text-input_textInput__KCdAH:focus {
      border-color: #4CAF50 !important;
      box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1) !important;
    }
    .quiz-editor .form-field_formFields__DpY83:not(.modal_content__ZijTp *) {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      width: 100% !important;
      max-width: 800px !important;
      margin-left: 60% !important;
      transform: translateX(-50%) !important;
      padding: 20px !important;
    }
    .quiz-editor .radio-buttons_variantHorizontal__YgMaQ:not(.modal_content__ZijTp *),
    .quiz-editor fieldset.game-items-checkboxes_checkboxes__gXef7 {
      margin-left: 60% !important;
      transform: translateX(-50%) !important;
      width: 100% !important;
      max-width: 800px !important;
    }
    .game-items-checkboxes_playButton___RDVJ,
    .game-items-checkboxes_image__Vji7R {
      display: none !important;
    }
    fieldset.game-items-checkboxes_checkboxes__gXef7 {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 12px !important;
      padding: 16px !important;
      border: none !important;
      background: #f8f9fa !important;
      border-radius: 8px !important;
    }
    /* Style the buttons */
    label.checkbox_checkbox__ijUfY {
      position: relative !important;
      margin: 0 !important;
      padding: 0 !important;
      display: block !important;
    }
    label.checkbox_checkbox__ijUfY input[type="checkbox"].checkbox_input__sY1f4,
    label.checkbox_checkbox__ijUfY span.checkbox_mark__P1i9m {
      display: none !important;
    }
    label.checkbox_checkbox__ijUfY div.game-items-checkboxes_inside__YRipE {
      background: white !important;
      padding: 10px 16px !important;
      border-radius: 6px !important;
      cursor: pointer !important;
      transition: all 0.2s ease-in-out !important;
      text-align: center !important;
      white-space: nowrap !important;
      display: inline-block !important;
      min-width: fit-content !important;
      border: 1px solid #e0e0e0 !important;
      font-size: 14px !important;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
      user-select: none !important;
    }
    label.checkbox_checkbox__ijUfY input[type="checkbox"].checkbox_input__sY1f4:checked + span + div.game-items-checkboxes_inside__YRipE {
      background: #4CAF50 !important;
      color: white !important;
      border-color: #43a047 !important;
      box-shadow: 0 2px 4px rgba(76,175,80,0.2) !important;
      transform: translateY(-1px) !important;
    }
    label.checkbox_checkbox__ijUfY div.game-items-checkboxes_inside__YRipE:hover {
      background: #f5f5f5 !important;
      border-color: #d0d0d0 !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
      transform: translateY(-1px) !important;
    }
    label.checkbox_checkbox__ijUfY input[type="checkbox"].checkbox_input__sY1f4:checked + span + div.game-items-checkboxes_inside__YRipE:hover {
      background: #43a047 !important;
      box-shadow: 0 3px 6px rgba(76,175,80,0.25) !important;
    }
    label.checkbox_checkbox__ijUfY div.game-items-checkboxes_inside__YRipE:active {
      transform: translateY(0px) !important;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
    }

    /* Radio Button Styles */
    .form-field_formField__8jNau {
      margin-bottom: 20px !important;
    }
    .form-field_label__waBvE {
      font-size: 16px !important;
      font-weight: 500 !important;
      margin-bottom: 12px !important;
      color: #333 !important;
    }
    .radio-buttons_variantHorizontal__YgMaQ {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 12px !important;
      padding: 16px !important;
      background: #f8f9fa !important;
      border-radius: 8px !important;
    }
    .radio-button_root__c3sU8 {
      position: relative !important;
      margin: 0 !important;
      padding: 10px 16px !important;
      display: inline-block !important;
      cursor: pointer !important;
      background: white !important;
      border-radius: 6px !important;
      transition: all 0.2s ease-in-out !important;
      text-align: center !important;
      white-space: nowrap !important;
      min-width: fit-content !important;
      border: 1px solid #e0e0e0 !important;
      font-size: 14px !important;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
      user-select: none !important;
    }
    .radio-button_input__TBlOU {
      position: absolute !important;
      opacity: 0 !important;
    }
    .radio-button_root__c3sU8.radio-button_checked__UM5TR,
    .radio-button_root__c3sU8:has(input:checked) {
      background: #4CAF50 !important;
      color: white !important;
      border-color: #43a047 !important;
      box-shadow: 0 2px 4px rgba(76,175,80,0.2) !important;
      transform: translateY(-1px) !important;
    }
    .radio-button_root__c3sU8:hover {
      background: #f5f5f5 !important;
      border-color: #d0d0d0 !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
      transform: translateY(-1px) !important;
    }
    .radio-button_root__c3sU8.radio-button_checked__UM5TR:hover,
    .radio-button_root__c3sU8:has(input:checked):hover {
      background: #43a047 !important;
      box-shadow: 0 3px 6px rgba(76,175,80,0.25) !important;
    }
    .radio-button_root__c3sU8:active {
      transform: translateY(0px) !important;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
    }

    .coorditem-list_coordItemList__JE8b1 {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
      gap: 12px !important;
      padding: 0 !important;
      margin: 12px 0 !important;
    }
    .coorditem-list_coordListItem__C37x_ {
      display: flex !important;
      align-items: center !important;
      padding: 8px 12px !important;
      background: #f8f9fa !important;
      border-radius: 8px !important;
      border: 1px solid #e9ecef !important;
      margin: 0 !important;
    }
    .coorditem-list_coordListItem__C37x_:hover {
      background: #fff !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
    }
    .coorditem-list_question__lbxAI {
      font-weight: 500 !important;
      flex: 1 !important;
      margin-right: 8px !important;
    }
    .coorditem-list_info__ZmHoQ {
      color: #6c757d !important;
      font-size: 0.9em !important;
      margin-right: 8px !important;
    }
    .coorditem-list_editButton__F5g0O {
      opacity: 0.6 !important;
      transition: opacity 0.2s !important;
    }
    .coorditem-list_coordListItem__C37x_:hover .coorditem-list_editButton__F5g0O {
      opacity: 1 !important;
    }
    .coorditem-list_headings__qkbEo {
      display: none !important;
    }
    .map-maker_addItemButton__CSYg5 {
      margin-top: 12px !important;
    }
    .form-field_formField__8jNau:has(.coorditem-list_coordItemList__JE8b1) {
      margin-bottom: 12px !important;
      padding: 16px !important;
      background: #fff !important;
      border-radius: 12px !important;
      box-shadow: 0 2px 12px rgba(0,0,0,0.05) !important;
    }
    .function-lock_root__qKWDl {
      position: fixed !important;
      top: 16px !important;
      right: 16px !important;
      z-index: 1000 !important;
    }
    .function-lock_root__qKWDl button {
      background: #4CAF50 !important;
      color: white !important;
      border: none !important;
      padding: 10px 24px !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      border-radius: 8px !important;
      transition: all 0.2s ease !important;
      box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2) !important;
    }
    .function-lock_root__qKWDl button:hover {
      background: #43A047 !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3) !important;
    }
    .function-lock_root__qKWDl button:active {
      transform: translateY(0) !important;
      box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2) !important;
    }
  `;
  document.head.appendChild(style);

  keydownListener = (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    
    const dotCircle = document.querySelector('.hitbox-dot_dot__laacR:hover, .hitbox-dot_dot__laacR.selected');
    if (!dotCircle) return;

    dotCircle.classList.add('selected');

    const dotGroup = dotCircle.parentElement;
    if (!dotGroup || dotGroup.tagName.toLowerCase() !== 'g') return;

    e.preventDefault();

    try {
      const transform = dotGroup.getAttribute('transform');
      const coords = transform.match(/translate\(([\d.]+)[,\s]+([\d.]+)\)/);
      if (!coords) return;

      let x = Number(coords[1]);
      let y = Number(coords[2]);

      const moveAmount = e.shiftKey ? 2 : 0.5;
      switch (e.key) {
        case 'ArrowLeft': x -= moveAmount; break;
        case 'ArrowRight': x += moveAmount; break;
        case 'ArrowUp': y -= moveAmount; break;
        case 'ArrowDown': y += moveAmount; break;
      }

      dotGroup.setAttribute('transform', `translate(${x}, ${y})`);
    } catch (err) {
      console.error('Error moving dot:', err);
    }
  };

  clickListener = (e) => {
    if (!e.target.closest('.hitbox-dot_dot__laacR')) {
      document.querySelector('.hitbox-dot_dot__laacR.selected')?.classList.remove('selected');
    }
  };

  document.addEventListener('keydown', keydownListener);
  document.addEventListener('click', clickListener);

  const selectionStyle = document.createElement('style');
  selectionStyle.textContent = `
    .hitbox-dot_dot__laacR.selected {
      stroke: #fff;
      stroke-width: 2px;
    }
  `;
  document.head.appendChild(selectionStyle);
}

cleanupSeterraEditor();

const pageObserver = new MutationObserver(() => {
  cleanupSeterraEditor();
});

pageObserver.observe(document.body, {
  childList: true,
  subtree: true
});
