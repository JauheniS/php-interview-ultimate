import os
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def extract_questions(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by categories (H2)
    categories = re.split(r'^##\s+(?!\d\.)(\d+)\.\s+(.*)$', content, flags=re.MULTILINE)[1:]
    
    # Sometimes it doesn't match the number if it's already there
    # Let's try a more general one for H2
    # The QUESTIONS.md has "## 1. PHP Basics & Language Features"
    
    categories = re.split(r'^##\s+(\d+)\.\s+(.*)$', content, flags=re.MULTILINE)[1:]
    
    structured_data = []
    for i in range(0, len(categories), 3):
        cat_id = categories[i]
        cat_name = categories[i+1]
        cat_content = categories[i+2]
        
        # Split cat_content by levels (H3)
        levels = re.split(r'^###\s+(Junior|Middle|Senior|Expert)?.*$', cat_content, flags=re.MULTILINE)[1:]
        
        cat_data = {
            'id': cat_id,
            'name': cat_name,
            'levels': []
        }
        
        for j in range(0, len(levels), 2):
            level_name = levels[j]
            level_content = levels[j+1]
            
            # Split level_content by questions (H4)
            questions = re.split(r'^####\s+(.*)$', level_content, flags=re.MULTILINE)[1:]
            
            level_data = {
                'name': level_name,
                'questions': []
            }
            
            for k in range(0, len(questions), 2):
                q_text = questions[k]
                q_answer_raw = questions[k+1]
                
                # Answer is until the next question or level or category
                # But here it's already split.
                # Just need to clean up.
                
                level_data['questions'].append({
                    'text': q_text,
                    'answer': q_answer_raw.strip()
                })
            
            if level_data['questions']:
                cat_data['levels'].append(level_data)
        
        structured_data.append(cat_data)
    
    return structured_data

def create_mdx_files(structured_data, base_dir):
    if not os.path.exists(base_dir):
        os.makedirs(base_dir)
        
    global_q_count = 1
    
    for cat in structured_data:
        cat_slug = f"{cat['id']}-{slugify(cat['name'])}"
        cat_dir = os.path.join(base_dir, cat_slug)
        os.makedirs(cat_dir, exist_ok=True)
        
        # Create _category_.json for Docusaurus
        with open(os.path.join(cat_dir, '_category_.json'), 'w') as f:
            f.write(f'{{\n  "label": "{cat["id"]}. {cat["name"]}",\n  "position": {cat["id"]}\n}}')
            
        for level in cat['levels']:
            level_slug = slugify(level['name'])
            level_dir = os.path.join(cat_dir, level_slug)
            os.makedirs(level_dir, exist_ok=True)
            
            # Create _category_.json for Level
            with open(os.path.join(level_dir, '_category_.json'), 'w') as f:
                f.write(f'{{\n  "label": "{level["name"]}"\n}}')
                
            for q_idx, q in enumerate(level['questions'], 1):
                # Numerate: Global count or per-category count?
                # User said "Numerate all questions", usually global is better for preparation
                
                q_title = f"{global_q_count}. {q['text']}"
                q_filename = f"{q_idx:03d}-{slugify(q['text'][:50])}.mdx"
                
                mdx_content = f"""---
title: "{q_title}"
---

# {q_title}

{q['answer']}

---

:::info
Category: {cat['name']} | Level: {level['name']}
:::
"""
                # Handle links to answers/
                # Replace (answers/something.md) with (../../../../answers/something.md) or just copy the answers?
                # Actually, I should probably integrate the detailed answers too.
                
                with open(os.path.join(level_dir, q_filename), 'w') as f:
                    f.write(mdx_content)
                
                global_q_count += 1

if __name__ == "__main__":
    data = extract_questions('QUESTIONS.md')
    create_mdx_files(data, 'docs/docs/questions')
