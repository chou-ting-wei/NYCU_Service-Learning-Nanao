# NYCU_Service-Learning-Nanao

## 介紹
一個疼痛互動管理的網站

## 安裝
### node.js
先安裝Node.js (https://nodejs.org/en/download/current)

下載前端的github專案 (https://github.com/chou-ting-wei/NYCU_Service-Learning-Nanao)
或是執行`git clone https://github.com/chou-ting-wei/NYCU_Service-Learning-Nanao.git`

接著打開前端專案的folder
執行
```sh
cd frontend
npm install
npm run dev
```

## admin 使用方法
帳號: admin
密碼: admin

進入admin權限後，在右上角會出現管理頁面，點入即可編輯所有帳號，也可以新增帳號
![螢幕擷取畫面 2024-05-21 190507](https://github.com/chou-ting-wei/NYCU_Service-Learning-Nanao/assets/76591703/cbae3404-0087-4bb9-ba17-6e610bb131cc)

## 檔案目錄說明
```
.
├── LICENSE
├── README.md
└── frontend
    ├── README.md
    ├── index.html
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
    ├── src
        ├── App.css
        ├── App.tsx
        ├── assets
        │   ├── Admin.css
        │   ├── Admin.tsx
        │   ├── EditUser.css
        │   ├── EditUser.tsx
        │   ├── Interact
        │   ├── Login.css
        │   ├── Login.tsx
        │   ├── Logout.tsx
        │   ├── Navig.tsx
        │   ├── NotFound.css
        │   ├── NotFound.tsx
        │   ├── Profile.css
        │   ├── Profile.tsx
        │   ├── Stat.css
        │   └── Stat.tsx
        ├── index.css
        ├── main.tsx
        └── vite-env.d.ts
```

