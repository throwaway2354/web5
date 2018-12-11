var f = [];
function factorial (n) {
    if (n == 0 || n == 1)
        return 1;
    if (f[n] > 0)
        return f[n];
    return f[n] = factorial(n-1) * n;
}

function ellipseArea(r1, r2) {
    return Math.PI * r1 * r2;
}

function sin(x) {
    var sum = 0;
    for (var i = 0; i < 1000; i++) {
        sum += Math.pow(-1, i) * (Math.pow(x, 2 * i + 1) / factorial(2 * i + 1));
    }
    return sum;
}

document.querySelector("#ellipse-area").addEventListener("submit", function(e){
    e.preventDefault();
    var r1 = Number(this.elements[0].value);
    var r2 = Number(this.elements[1].value);
    if (isNaN(r1) || r1 < 0 || isNaN(r2) || r2 < 0) {
        console.log('error');
    } else {
        console.log(ellipseArea(r1, r2));
    }
});

document.querySelector("#sine").addEventListener("submit", function(e){
    e.preventDefault();
    var x = Number(this.elements[0].value);
    if (isNaN(x)) {
        console.log('error');
    } else {
        console.log(sin(x));
    }
});

document.querySelector("#matrix-avg").addEventListener("submit", function(e){
    e.preventDefault();
    var M = [
        [1, 2, 3, 4, 5, 6, 7, 8],
        [10, 2, 3, 4, 5, 6, 7, 8],
        [20, 2, 3, 4, 5, 6, 7, 8],
        [-500, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [9, 9, 9, 9, 9, 9, 9, 1],
    ]
    for (var i in M) {
        var a = M[i];
        var average = a.reduce((a, b) => (a + b)) / a.length;
        var sum = 0;
        for (var j in a) {
            if (a[j] > average) {
                sum += 1;
            }
        }
        console.log(sum);
    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getArray(n) {
    var a = [];
    for (var i = 0; i < n; i++) {
        a.push(getRandomInt(1, 101));
    }
    return a;
}

function getResultArray(a) {
    a.sort((a, b) => a - b);
    return a;
}

function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    tableData.forEach(function(rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    return table;
}

document.querySelector("#matrix-arrange").addEventListener("submit", function(e){
    e.preventDefault();
    var n = Number(this.elements[0].value);
    var s = getResultArray(getArray(n * n));
    var direction = false;
    var M = [];
    for (var i = 0; i < n; i++) {
        var a = [];
        for (var j = 0; j < n; j++) {
            a.push(s.pop());
        }
        if (direction) {
            a.reverse();
        }
        M.push(a);
        direction = !direction;
    }
    M.reverse();
    console.log(M);
    document.body.appendChild(createTable(M));
});
