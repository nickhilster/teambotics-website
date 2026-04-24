from pathlib import Path
path = Path('components/admin/chatbot/ChatbotAdminPage.tsx')
text = path.read_text(encoding='utf-8')
text = text.replace('})))}}', '}))}')
text = text.replace('})))', '}))}')
path.write_text(text, encoding='utf-8')
print('updated', text.count('})))}'), 'remaining occurrences of })))}')
