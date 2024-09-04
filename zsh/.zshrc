# Color and glyph configurations
COLOR_PROMPT_TEXT='009'              # Red
COLOR_PROMPT_GLYPH='255'             # White
COLOR_GIT_REPOSITORY_TEXT='245'      # Grey
COLOR_GIT_BRANCH_TEXT='255'          # White
COLOR_GIT_STATUS_CLEAN='010'         # Green
COLOR_GIT_STATUS_DIRTY='009'         # Red
NUM_DIRS_LEFT_OF_TRUNCATION=1        # Number of directory names to the left of the truncation symbol (must be > 0)
NUM_DIRS_RIGHT_OF_TRUNCATION=2       # Number of directory names to the right of the truncation symbol (must be > 0)
GLYPH_PROMPT_TRUNCATION_SYMBOL='⋯'   # DejaVu Sans Mono glyph for prompt truncation
GLYPH_PROMPT_END_SYMBOL='❯'          # DejaVu Sans Mono glyph for end of prompt
GLYPH_GIT_BRANCH_SYNC_SYMBOL='«'     # DejaVu Sans Mono glyph for Git branch sync status indicator
GLYPH_GIT_STASH_SYMBOL='∘'           # DejaVu Sans Mono glyph for Git stash indicator
GLYPH_GIT_STATUS_SYMBOL='»'          # DejaVu Sans Mono glyph for Git status indicator

# Prompt customizations
precmd_functions+=(set_prompt)
precmd_functions+=(set_rprompt)

# Clear and reset scroll-back aliases
alias c='clear'
alias cs="printf '\33c\e[3J'"

# Directory navigation aliases
alias .='pwd'
alias ..='cd ..'
alias ...='cd ../..'
alias h='cd ~'

# Zsh
HISTFILE=~/.zsh_history              # History file
HISTSIZE='100'                       # Number of commands to keep in memory
SAVEHIST='10000'                     # Number of commands to save to the history file
setopt EXTENDED_HISTORY              # Enable timestamp in history
setopt INC_APPEND_HISTORY            # Enable appending to the history file immediately
alias refresh='source ~/.zshrc'
alias hist='echo " Last 30 entries" && history -t "[%F %r]" -30'

# WSL (Cloning a repository ends up creating Zone.Identifier files)  
alias wslclean='find . -name "*:Zone.Identifier" -type f -delete'

# Git
autoload -Uz compinit && compinit

# Homebrew
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
alias brewtree='brew deps --install --tree'
alias brewclean='brew autoremove'

# nvm
export NVM_DIR="$HOME/.nvm"
source $(brew --prefix nvm)/nvm.sh

# Initialization
cs

# Helpers

set_prompt() {
  # Validate truncation thresholds and set defaults if required
  [[ $NUM_DIRS_LEFT_OF_TRUNCATION -le 0 ]] && NUM_DIRS_LEFT_OF_TRUNCATION=1
  [[ $NUM_DIRS_RIGHT_OF_TRUNCATION -le 0 ]] && NUM_DIRS_RIGHT_OF_TRUNCATION=2

  # Refer https://zsh.sourceforge.io/Doc/Release/Prompt-Expansion.html
  local prompt_truncation_symbol="%F{${COLOR_PROMPT_GLYPH}}%B${GLYPH_PROMPT_TRUNCATION_SYMBOL}%b%f"
  local prompt_end_symbol="%F{${COLOR_PROMPT_GLYPH}}%B${GLYPH_PROMPT_END_SYMBOL}%b%f"
  local total_dirs=$(($NUM_DIRS_LEFT_OF_TRUNCATION+$NUM_DIRS_RIGHT_OF_TRUNCATION+1))
  local dir_path_full="%F{${COLOR_PROMPT_TEXT}}%d%f"
  local dir_path_truncated="%F{${COLOR_PROMPT_TEXT}}%-${NUM_DIRS_LEFT_OF_TRUNCATION}d/%f${prompt_truncation_symbol}%F{${COLOR_PROMPT_TEXT}}/%${NUM_DIRS_RIGHT_OF_TRUNCATION}d%f"
  
  PROMPT="%(${total_dirs}C.${dir_path_truncated}.${dir_path_full}) ${prompt_end_symbol} "
}

set_rprompt() {
  # Attempt to get the current Git branch name
  local git_branch_name=$(git symbolic-ref --short HEAD 2> /dev/null)
  if [[ -z $git_branch_name ]]; then
    # Unable to get the branch name
    RPROMPT=""

    return
  fi

  # Collect Git status information

  local git_remote_commit=$(git rev-parse "origin/$git_branch_name" 2> /dev/null)
  local git_local_commit=$(git rev-parse "$git_branch_name" 2> /dev/null)
  local git_branch_sync_color=$COLOR_GIT_STATUS_DIRTY
  if [[ $git_remote_commit == $git_local_commit ]]; then
    # Branch in sync
    git_branch_sync_color=$COLOR_GIT_STATUS_CLEAN
  fi

  local git_stash=$(git stash list)
  local git_stash_symbol=$GLYPH_GIT_STASH_SYMBOL
  if [[ -z $git_stash ]]; then
    # Empty stash
    git_stash_symbol=""
  fi

  local git_status=$(git status --porcelain)
  local git_stash_color=$COLOR_GIT_STATUS_DIRTY
  local git_status_color=$COLOR_GIT_STATUS_DIRTY
  if [[ -z $git_status ]]; then
    # Nothing reported in status
    git_stash_color=$COLOR_GIT_STATUS_CLEAN
    git_status_color=$COLOR_GIT_STATUS_CLEAN
  fi

  # Get the top-level directory of the Git repository
  local git_repository_path=$(git rev-parse --show-toplevel)
  local git_repository_name=$(basename "$git_repository_path")

  local git_repository_text="%F{${COLOR_GIT_REPOSITORY_TEXT}}${git_repository_name}%f"
  local git_branch_sync_symbol="%F{${git_branch_sync_color}}%B${GLYPH_GIT_BRANCH_SYNC_SYMBOL}%b%f"
  local git_stash_symbol="%F{${git_stash_color}}%B${git_stash_symbol}%b%f"
  local git_status_symbol="%F{${git_status_color}}%B${GLYPH_GIT_STATUS_SYMBOL}%b%f"
  local git_branch_text="%F{${COLOR_GIT_BRANCH_TEXT}}${git_branch_name}%f"

  RPROMPT="${git_repository_text} ${git_branch_sync_symbol}${git_stash_symbol}${git_status_symbol} ${git_branch_text}"
}
