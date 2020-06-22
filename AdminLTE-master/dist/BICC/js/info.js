$(function () {
    $('#excel-file').change(function (e) {
      var files = e.target.files;
      var fileReader = new FileReader();
      fileReader.onload = function (ev) {
        try {
          var data = ev.target.result,
            workbook = XLSX.read(data, {
                
              type: 'binary'
            }),
             // 以二进制流方式读取得到整份excel表格对象
            persons = []; 
           // 存储获取到的数据
        } catch (e) {
            console.log(workbook);
          console.log('文件类型不正确');
          return;
        }

        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = '';
        // 遍历每张表读取
        for (var sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            fromTo = workbook.Sheets[sheet]['!ref'];
            // console.log(fromTo);
            persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        console.log(workbook);
        console.log(persons);
        
        //动态生成表格
        var tbody=document.querySelector("tbody");
  for(var i=0;i<persons.length;i++)  //外面的for循环 是 行tr
  {
      var tr=document.createElement("tr");
      tbody.appendChild(tr);
      //3,往tr每一行里面创建单元格（跟数据有关系的3个单元格），td单元格的数量取决于每个对象的属性个数 for循环遍历对象 persons[i]
      for(var k in persons[i])   //里面的for循环是 列
      {
          var td=document.createElement("td");  //创建单元格
          tr.appendChild(td);
          td.innerHTML=persons[i][k]; //把对象里面的属性值 persons[i][k]给td
      }
      //4，创建有删除二字的单元格
      var td=document.createElement("td");
      tr.appendChild(td);
      td.innerHTML="<button type='button' class='btn  btn-primary btn-sm change'>修改</button><button type='button' class='btn  btn-primary btn-sm del' style='margin-left: 20px;'>删除</button>";

  }
  //5,删除操作
  var as=document.getElementsByClassName('del');
  for(var i=0;i<as.length;i++)
  {
      as[i].onclick=function () {  //点击a 删除 当前a 所在的行（a链接的爸爸的爸爸）
          tbody.removeChild(this.parentNode.parentNode);
      }
  }
       
      };

      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files[0]);
  
    });
    //修改input type="file" 样式
   

    //
  })
