document.addEventListener('DOMContentLoaded', () => {
    const aoeInput = document.getElementById('aoe');
    const nInput = document.getElementById('n');
    const rInput = document.getElementById('r-input');

    aoeInput.addEventListener('input', updateRFromAoE);
    nInput.addEventListener('input', () => {
        updateRFromAoE();
        updateEdgeFromR();
    });
    rInput.addEventListener('input', updateEdgeFromR);
});

function updateRFromAoE() {
    const aoeField = document.getElementById('aoe');
    const nField = document.getElementById('n');
    const resultDiv = document.getElementById('result');

    const aoeStr = aoeField.value.trim();
    const nStr = nField.value.trim();

    if (aoeStr === '' || nStr === '') {
        resultDiv.innerText = '';
        return;
    }

    const aoe = parseFloat(aoeStr);
    const n = parseInt(nStr);

    if (isNaN(aoe) || isNaN(n) || aoe <= 0 || n < 2) {
        resultDiv.innerText = "正しい値を入力してください（AoEの半径 > 0, 人数 ≥ 2）";
        return;
    }

    const sinValue = Math.sin(Math.PI / n);
    let left = 0;
    let right = aoe;

    while (2 * right * sinValue <= aoe) {
        right *= 2;
    }

    let answer = right;
    for (let i = 0; i < 100; i++) {
        const mid = (left + right) / 2;
        const edge = 2 * mid * sinValue;
        if (edge > aoe + 1e-10) {
            answer = mid;
            right = mid;
        } else {
            left = mid;
        }
    }

    const R = answer;
    const edge = 2 * R * sinValue;

    if (edge <= aoe + 1e-10) {
        resultDiv.innerText = "計算誤差により条件 edge > AoE を満たすRが見つかりませんでした。";
        return;
    }

    resultDiv.innerText =
        `最小散開の円周半径: ${R.toFixed(10)}\n` +
        `プレイヤー同士の距離: ${edge.toFixed(10)}`;
}

function updateEdgeFromR() {
    const rField = document.getElementById('r-input');
    const nField = document.getElementById('n');
    const edgeResult = document.getElementById('edge-result');

    const rStr = rField.value.trim();
    const nStr = nField.value.trim();

    if (rStr === '' || nStr === '') {
        edgeResult.innerText = '';
        return;
    }

    const r = parseFloat(rStr);
    const n = parseInt(nStr);

    if (isNaN(r) || isNaN(n) || r <= 0 || n < 2) {
        edgeResult.innerText = "正しい値を入力してください（散開する円周の半径 > 0, 人数 ≥ 2）";
        return;
    }

    const sinValue = Math.sin(Math.PI / n);
    const edge = 2 * r * sinValue;

    edgeResult.innerText = `プレイヤー同士の距離: ${edge.toFixed(5)}`;
}
