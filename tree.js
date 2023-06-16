const fs = require('fs');
const readline = require('node:readline');
const {
    stdin: input,
    stdout: output,
} = require('node:process');

const rl_path = readline.createInterface({ input, output });

rl_path.question('Введите путь к директории: ', (full_path) => {
  fs.stat(full_path, (err_stat, stats) => {
    if (err_stat) { 
      console.log("Директория не найдена. ", err_stat);
      process.exit(-1);
    }
    if (!stats.isDirectory()) return console.log("Задан некорректный путь");
    rl_path.question('Введите глубину построения (значение должно быть числом): ', (max_depth) => {
      if (typeof(max_depth*1) !== "number") return console.log("Значение должно быть числом. typeof(max_depth)", typeof(max_depth));
      build_tree(full_path, max_depth);
      rl_path.close();
    });
  })
});

const build_tree = (path, max_depth = 3, current_depth = 0) => {
  let printable_branch = "";
  for( i = 0; i < current_depth; i++ ) {
    printable_branch = printable_branch + " ";
  }
    
  if (path && max_depth > 0 && max_depth >= current_depth) {
    console.log("%s|___%s, current_depth: %s", printable_branch, path, current_depth)
    fs.stat(path, (err_stat, stats) => {
      try {
        if (stats.isDirectory()) {
          fs.readdir(path, (err, items) => {
    
            if (err) console.log("Возникла ошибка при чтении директории: ", err)
            else {
              items.forEach((item) => {
                if (current_depth <= max_depth) {
                  const new_depth = current_depth + 1;
                  build_tree(path + "\\" + item, max_depth, new_depth);
                }
              })
            }
            // console.log(items);
          });
        }
      }
      catch (exc) {
        //Пока заглушка
      }

    
    });
  }    
}