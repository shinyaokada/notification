#!/bin/bash

# 色付き出力用の定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ディレクトリパス
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIGS_DIR="$SCRIPT_DIR/configs"
OUTPUTS_DIR="$SCRIPT_DIR/outputs"
MAIN_FILE="$SCRIPT_DIR/src/main.js"

echo -e "${GREEN}🔨 応募通知システム ビルドスクリプト${NC}"
echo "======================================="

# outputsフォルダが存在しない場合は作成
if [ ! -d "$OUTPUTS_DIR" ]; then
    mkdir -p "$OUTPUTS_DIR"
    echo -e "${GREEN}✅ outputsフォルダを作成しました${NC}"
fi

# src/main.jsの存在確認
if [ ! -f "$MAIN_FILE" ]; then
    echo -e "${RED}❌ エラー: src/main.jsが見つかりません${NC}"
    exit 1
fi

# configsフォルダの存在確認
if [ ! -d "$CONFIGS_DIR" ]; then
    echo -e "${RED}❌ エラー: configsフォルダが見つかりません${NC}"
    exit 1
fi

# configsフォルダ内の.jsファイルを数える
config_count=$(find "$CONFIGS_DIR" -name "*.js" -type f 2>/dev/null | wc -l | tr -d ' ')

if [ "$config_count" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  configsフォルダにJSファイルが見つかりません${NC}"
    exit 0
fi

echo -e "${GREEN}📁 ${config_count}個の設定ファイルを検出しました${NC}"
echo ""

# 各configファイルに対して処理
success_count=0
for config_file in "$CONFIGS_DIR"/*.js; do
    if [ -f "$config_file" ]; then
        filename=$(basename "$config_file")
        output_file="$OUTPUTS_DIR/$filename"
        
        echo -e "📄 処理中: ${YELLOW}$filename${NC}"
        
        # configファイルとmain.jsを結合
        cat "$config_file" "$MAIN_FILE" > "$output_file"
        
        if [ $? -eq 0 ]; then
            echo -e "   ${GREEN}✅ 出力完了: outputs/$filename${NC}"
            ((success_count++))
        else
            echo -e "   ${RED}❌ エラー: ファイルの結合に失敗しました${NC}"
        fi
        echo ""
    fi
done

echo "======================================="
echo -e "${GREEN}🎉 ビルド処理が完了しました！${NC}"
echo -e "${GREEN}📂 outputsフォルダに${success_count}個のファイルを生成しました${NC}"