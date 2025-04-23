import os
import re
import sys
from pathlib import Path

def count_lines(file_path):
    if not os.path.exists(file_path):
        print(f'Error: File {file_path} not found.')
        return 0
    
    # Determine file extension to apply appropriate comment rules
    _, ext = os.path.splitext(file_path)
    ext = ext.lower()

    # Define comment patterns for supported languages
    comment_patterns = {
        '.rb': r'^\s*#',      # Ruby comments start with #
        '.pl': r'^\s*%',      # Prolog comments start with %
        '.scala': r'^\s*(//|\*)', # Scala comments start with // or *
        '.go': r'^\s*//'      # Go comments start with //
    }

    # Multi-line comment patterns
    multi_start_patterns = {
        '.rb': r'=begin',
        '.scala': r'/\*',
        '.go': r'/\*'
        # Prolog doesn't have multi-line comment syntax
    }
    
    multi_end_patterns = {
        '.rb': r'=end',
        '.scala': r'\*/',
        '.go': r'\*/'
    }

    # Check if language is supported
    if ext not in comment_patterns:
        print(f"Warning: File type '{ext}' not supported. Treating all non-blank lines as code.")
        
    # Initialize counters
    total_lines = 0
    blank_lines = 0
    comment_lines = 0
    code_lines = 0
    in_multiline_comment = False

    # Read the file
    with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
        for line in file:
            total_lines += 1
            
            # Strip whitespace
            stripped_line = line.strip()
            
            # Check for blank lines
            if not stripped_line:
                blank_lines += 1
                continue
            
            # Check for multi-line comment boundaries
            if ext in multi_start_patterns and re.search(multi_start_patterns[ext], stripped_line):
                in_multiline_comment = True
                comment_lines += 1
                continue
                
            if in_multiline_comment:
                comment_lines += 1
                if ext in multi_end_patterns and re.search(multi_end_patterns[ext], stripped_line):
                    in_multiline_comment = False
                continue
            
            # Check for single-line comments
            if ext in comment_patterns and re.search(comment_patterns[ext], stripped_line):
                comment_lines += 1
                continue
            
            # If we get here, it's a code line
            code_lines += 1
    
    return {
        'total': total_lines,
        'blank': blank_lines,
        'comment': comment_lines,
        'code': code_lines
    }

def main():
    if len(sys.argv) < 2:
        print("Usage: python count_lines.py <file_path>")
        return
    
    file_path = sys.argv[1]
    # file_path = Path("D:\APCS\2024-2025\Semester2\Principles\PROJECT\CS320_PPL\01_language_comparison\cycle_detection\cycle_detection.rb")
    # file_path = Path("D:\APCS\2024-2025\Semester2\Principles\PROJECT\CS320_PPL\01_language_comparison\cycle_detection\cycle_detection.go")
    stats = count_lines(file_path)
    
    print(f"File: {file_path}")
    print(f"Total lines: {stats['total']}")
    print(f"Blank lines: {stats['blank']}")
    print(f"Comment lines: {stats['comment']}")
    print(f"Code lines: {stats['code']}")

if __name__ == "__main__":
    main()